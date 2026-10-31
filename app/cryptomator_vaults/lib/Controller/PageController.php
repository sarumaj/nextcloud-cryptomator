<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Controller;

use OCA\CryptomatorVaults\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IRequest;
use OCP\Util;

/**
 * The page that opens vaults. The server takes no part in it beyond serving
 * the page: the browser reads the encrypted files over WebDAV and decrypts them
 * itself (js/vault.js), so neither the password nor a key reaches the server.
 */
class PageController extends Controller {
	public function __construct(
		string $appName,
		IRequest $request,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function index(): TemplateResponse {
		Util::addTranslations(Application::APP_ID);
		Util::addScript(Application::APP_ID, 'vault');
		Util::addScript(Application::APP_ID, 'main');
		Util::addStyle(Application::APP_ID, 'main');
		$response = new TemplateResponse(Application::APP_ID, 'main');
		// Previews of decrypted files are blob: URLs, made in the page: video and
		// audio play from them, PDFs show in a frame.
		$policy = new ContentSecurityPolicy();
		$policy->addAllowedMediaDomain('blob:');
		$policy->addAllowedFrameDomain('blob:');
		$response->setContentSecurityPolicy($policy);
		return $response;
	}
}
