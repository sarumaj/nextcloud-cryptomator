<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Tests;

use OCA\CryptomatorVaults\AppInfo\Application;
use OCA\CryptomatorVaults\Listener\AddPreviewPolicy;
use OCA\CryptomatorVaults\Listener\LoadFilesScripts;
use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\IAppContainer;
use OCP\EventDispatcher\IEventListener;
use OCP\IConfig;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../stubs/files.php';

/**
 * The app as Nextcloud boots it: the two listeners, each for its event, and the names the
 * server, info.xml and the Files integration (src/files.js) must agree on.
 */
class ApplicationTest extends TestCase {
	private function application(): Application {
		$config = $this->createMock(IConfig::class);
		$config->method('getSystemValueBool')->willReturn(false);
		(new FakeServer([IConfig::class => $config], $this->createMock(IAppContainer::class)))->install();
		return new Application();
	}

	public function testTheListenersAreRegisteredForTheirEvents(): void {
		$registered = [];
		$context = $this->createMock(IRegistrationContext::class);
		$context->method('registerEventListener')->willReturnCallback(function (string $event, string $listener) use (&$registered): void {
			$registered[$event][] = $listener;
		});
		$this->application()->register($context);
		$this->assertSame([
			LoadAdditionalScriptsEvent::class => [LoadFilesScripts::class],
			AddContentSecurityPolicyEvent::class => [AddPreviewPolicy::class],
		], $registered);
		foreach ($registered as $listeners) {
			$this->assertTrue(is_subclass_of($listeners[0], IEventListener::class), $listeners[0]);
		}
	}

	public function testTheAppIdAndNamespaceAreInfoXmls(): void {
		$info = simplexml_load_file(__DIR__ . '/../../app/cryptomator_vaults/appinfo/info.xml');
		$this->assertNotFalse($info);
		$this->assertSame(Application::APP_ID, (string)$info->id);
		// Nextcloud finds the app's classes, and this one, by the namespace info.xml names.
		$this->assertSame('OCA\\' . $info->namespace . '\\AppInfo\\Application', Application::class);
	}

	public function testTheViewIsTheOneTheFilesIntegrationRegisters(): void {
		$source = (string)file_get_contents(__DIR__ . '/../../src/files.js');
		$this->assertMatchesRegularExpression('/^export const VIEW_ID = \'' . preg_quote(Application::VIEW_ID, '/') . '\'$/m', $source);
	}
}
