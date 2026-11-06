<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Tests;

use OC\Security\CSP\ContentSecurityPolicyManager;
use OCA\CryptomatorVaults\Listener\AddPreviewPolicy;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\EventDispatcher\Event;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../stubs/server.php';

/**
 * The policy the previews need, and nothing more: Nextcloud applies it to every page, so it
 * may widen only what the previews use (blob: media and frames, compiling WebAssembly), never
 * eval of scripts or other origins.
 */
class AddPreviewPolicyTest extends TestCase {
	/**
	 * The directives of a policy as Nextcloud sends it, each with its sources.
	 *
	 * @return array<string, list<string>>
	 */
	private static function directives(ContentSecurityPolicy $policy): array {
		$directives = [];
		foreach (array_filter(explode(';', $policy->buildPolicy())) as $directive) {
			$parts = preg_split('/\s+/', trim($directive)) ?: [];
			$directives[(string)array_shift($parts)] = $parts;
		}
		return $directives;
	}

	public function testOnlyWhatThePreviewsNeedIsAdded(): void {
		$manager = new ContentSecurityPolicyManager();
		(new AddPreviewPolicy())->handle(new AddContentSecurityPolicyEvent($manager));
		$this->assertCount(1, $manager->policies);
		$this->assertInstanceOf(ContentSecurityPolicy::class, $manager->policies[0]);

		$added = self::directives($manager->policies[0]);
		$default = self::directives(new ContentSecurityPolicy());
		$changed = [];
		foreach ($added as $name => $sources) {
			if ($sources !== ($default[$name] ?? null)) {
				$changed[$name] = array_values(array_diff($sources, $default[$name] ?? []));
			}
		}
		$this->assertSame([
			'script-src' => ["'wasm-unsafe-eval'"],
			'media-src' => ['blob:'],
			'frame-src' => ['blob:'],
		], $changed);
		$this->assertSame([], array_diff(array_keys($default), array_keys($added)), 'no directive left out');
		$this->assertNotContains("'unsafe-eval'", $added['script-src']);
	}

	public function testOtherEventsAreLeftAlone(): void {
		$event = $this->createMock(Event::class);
		$event->expects($this->never())->method($this->anything());
		(new AddPreviewPolicy())->handle($event);
	}
}
