<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Controller;

use OCA\CryptomatorVaults\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\IRequest;
use OCP\IURLGenerator;

/**
 * "Vaults" in the app menu: the vaults' view in the Files app, where they are
 * browsed (src/files.js).
 */
class PageController extends Controller {
	public function __construct(
		string $appName,
		IRequest $request,
		private IURLGenerator $urlGenerator,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function index(): RedirectResponse {
		return new RedirectResponse($this->urlGenerator->linkToRoute('files.view.indexView', ['view' => Application::VIEW_ID]));
	}
}
