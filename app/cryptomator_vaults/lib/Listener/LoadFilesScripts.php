<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Listener;

use OCA\CryptomatorVaults\AppInfo\Application;
use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/**
 * The integration in the Files app (js/cryptomator_vaults-files.mjs, built from
 * src/): the view "Vaults" and its actions. Everything of a vault happens in the
 * browser; the server only serves these files.
 *
 * @template-implements IEventListener<LoadAdditionalScriptsEvent>
 */
class LoadFilesScripts implements IEventListener {
	public function handle(Event $event): void {
		if (!$event instanceof LoadAdditionalScriptsEvent) {
			return;
		}
		Util::addTranslations(Application::APP_ID);
		// Before Files' own scripts: its router may open the view at once (a link to
		// it, a reload), which must be registered by then.
		Util::addInitScript(Application::APP_ID, 'cryptomator_vaults-files');
		Util::addStyle(Application::APP_ID, 'files');
	}
}
