<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

return [
	'routes' => [
		// The only page: everything else happens in the browser, over WebDAV.
		['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
	],
];
