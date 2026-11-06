<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

// For the PHPUnit tests: the parts of Nextcloud's server (not of its public API, nextcloud/ocp)
// that the public API's classes call into, standing in for a running server. \OC::$server is the
// container OCP\Server::get() and OCP\AppFramework\App ask; OC_Util keeps the styles that
// OCP\Util::addStyle() adds; the policy manager keeps the policies a listener adds.

namespace {
	class OC {
		/** @var object A container with get() and getRegisteredAppContainer(), set by a test. */
		public static $server;
	}

	class OC_Util {
		/** @var list<array{string, ?string, bool}> */
		public static array $styles = [];

		public static function addStyle(string $application, ?string $file = null, bool $prepend = false): void {
			self::$styles[] = [$application, $file, $prepend];
		}
	}
}

namespace OC\Security\CSP {
	use OCP\AppFramework\Http\EmptyContentSecurityPolicy;

	class ContentSecurityPolicyManager {
		/** @var list<EmptyContentSecurityPolicy> */
		public array $policies = [];

		public function addDefaultPolicy(EmptyContentSecurityPolicy $policy): void {
			$this->policies[] = $policy;
		}
	}
}
