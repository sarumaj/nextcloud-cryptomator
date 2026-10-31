<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Listener;

use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;

/**
 * Previews of decrypted files are blob: URLs made in the page: video and audio
 * play from them, PDFs show in a frame (pictures are allowed from blob: already);
 * HEIC pictures are decoded by WebAssembly.
 * Nextcloud applies the policy to every page; the Files app is where it is used.
 *
 * @template-implements IEventListener<AddContentSecurityPolicyEvent>
 */
class AddPreviewPolicy implements IEventListener {
	public function handle(Event $event): void {
		if (!$event instanceof AddContentSecurityPolicyEvent) {
			return;
		}
		$policy = new ContentSecurityPolicy();
		$policy->addAllowedMediaDomain('blob:');
		$policy->addAllowedFrameDomain('blob:');
		// HEIC pictures are decoded by libheif as WebAssembly: compiling it, no eval of scripts.
		$policy->allowEvalWasm(true);
		$event->addPolicy($policy);
	}
}
