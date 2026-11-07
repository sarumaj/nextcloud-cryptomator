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
 * HEIC pictures are decoded by WebAssembly. Videos, audio and PDFs are streamed by
 * the app's service worker (js/stream-worker.js, registered from the page, which
 * Nextcloud's policy does not allow without worker-src), into frames of the
 * worker's pages on this server.
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
		$policy->addAllowedFrameDomain("'self'");
		$policy->addAllowedWorkerSrcDomain("'self'");
		// HEIC pictures are decoded by libheif as WebAssembly: compiling it, no eval of scripts.
		$policy->allowEvalWasm(true);
		$event->addPolicy($policy);
	}
}
