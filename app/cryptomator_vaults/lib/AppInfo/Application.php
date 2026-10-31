<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\AppInfo;

use OCA\CryptomatorVaults\Listener\AddPreviewPolicy;
use OCA\CryptomatorVaults\Listener\LoadFilesScripts;
use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;

class Application extends App implements IBootstrap {
	public const APP_ID = 'cryptomator_vaults';
	/** The view in the Files app (src/files.js, VIEW_ID). */
	public const VIEW_ID = 'cryptomator-vaults';

	public function __construct(array $urlParams = []) {
		parent::__construct(self::APP_ID, $urlParams);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadFilesScripts::class);
		$context->registerEventListener(AddContentSecurityPolicyEvent::class, AddPreviewPolicy::class);
	}

	public function boot(IBootContext $context): void {
	}
}
