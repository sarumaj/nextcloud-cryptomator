<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Tests;

use OCA\CryptomatorVaults\Listener\LoadFilesScripts;
use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCP\EventDispatcher\Event;
use OCP\L10N\IFactory;
use OCP\Util;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;

require_once __DIR__ . '/../stubs/files.php';

/**
 * The integration on the Files page: its module as an init script (loaded before Files' own
 * scripts, whose router may open the view at once) with the person's translations before it,
 * and its styles; each a file the app has.
 */
class LoadFilesScriptsTest extends TestCase {
	private const APP = __DIR__ . '/../../app/cryptomator_vaults';

	protected function setUp(): void {
		// OCP\Util keeps the page's scripts in static properties: each test starts with none.
		foreach (['scriptsInit', 'scripts'] as $name) {
			(new ReflectionProperty(Util::class, $name))->setValue(null, []);
		}
		\OC_Util::$styles = [];
		$languages = $this->createMock(IFactory::class);
		$languages->method('findLanguage')->with('cryptomator_vaults')->willReturn('pl');
		(new FakeServer([IFactory::class => $languages]))->install();
	}

	/** @return array<array-key, mixed> */
	private static function scripts(string $name): array {
		return (array)(new ReflectionProperty(Util::class, $name))->getValue();
	}

	public function testTheModuleLoadsEarlyAfterItsTranslations(): void {
		(new LoadFilesScripts())->handle(new LoadAdditionalScriptsEvent());
		$this->assertSame(['cryptomator_vaults/l10n/pl', 'cryptomator_vaults/js/cryptomator_vaults-files'], self::scripts('scriptsInit'));
		$this->assertSame([['cryptomator_vaults', 'files', false]], \OC_Util::$styles);
	}

	public function testWhatItLoadsIsInTheApp(): void {
		(new LoadFilesScripts())->handle(new LoadAdditionalScriptsEvent());
		// Nextcloud serves a script by its name with .mjs (a module) or .js.
		foreach (self::scripts('scriptsInit') as $script) {
			$path = self::APP . '/../' . $script;
			$this->assertTrue(is_file("$path.mjs") || is_file("$path.js"), "$script.(m)js");
		}
		foreach (\OC_Util::$styles as [$app, $file]) {
			$this->assertFileExists(self::APP . "/css/$file.css");
		}
		foreach (['de', 'pl'] as $language) {
			$this->assertFileExists(self::APP . "/l10n/$language.js");
		}
	}

	public function testOtherEventsLoadNothing(): void {
		(new LoadFilesScripts())->handle($this->createMock(Event::class));
		$this->assertSame([], self::scripts('scriptsInit'));
		$this->assertSame([], self::scripts('scripts'));
		$this->assertSame([], \OC_Util::$styles);
	}
}
