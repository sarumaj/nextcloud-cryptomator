<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Tests;

use OCA\CryptomatorVaults\Controller\PageController;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\IRequest;
use OCP\IURLGenerator;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;

/**
 * "Vaults" in the app menu: info.xml's navigation, the route and the controller lead every
 * person (not only admins) to the vaults' view in Files.
 */
class PageControllerTest extends TestCase {
	private const APP = __DIR__ . '/../../app/cryptomator_vaults';

	public function testIndexRedirectsToTheVaultsViewInFiles(): void {
		$urls = $this->createMock(IURLGenerator::class);
		$urls->expects($this->once())->method('linkToRoute')
			->with('files.view.indexView', ['view' => 'cryptomator-vaults'])
			->willReturn('/index.php/apps/files/cryptomator-vaults');
		$response = (new PageController('cryptomator_vaults', $this->createStub(IRequest::class), $urls))->index();
		$this->assertSame(Http::STATUS_SEE_OTHER, $response->getStatus());
		$this->assertSame('/index.php/apps/files/cryptomator-vaults', $response->getRedirectURL());
	}

	public function testIndexIsOpenToEveryPersonFromTheMenu(): void {
		$index = new ReflectionMethod(PageController::class, 'index');
		// Without these, a person who is no admin gets 403, and the menu's plain link a CSRF error.
		$this->assertCount(1, $index->getAttributes(NoAdminRequired::class));
		$this->assertCount(1, $index->getAttributes(NoCSRFRequired::class));
	}

	public function testTheMenusRouteIsTheControllersIndex(): void {
		$info = simplexml_load_file(self::APP . '/appinfo/info.xml');
		$this->assertNotFalse($info);
		$this->assertSame('cryptomator_vaults.page.index', (string)$info->navigations->navigation->route);
		$routes = require self::APP . '/appinfo/routes.php';
		$this->assertSame([['name' => 'page#index', 'url' => '/', 'verb' => 'GET']], $routes['routes']);
		// page#index is PageController::index, public.
		$this->assertTrue((new ReflectionMethod(PageController::class, 'index'))->isPublic());
	}
}
