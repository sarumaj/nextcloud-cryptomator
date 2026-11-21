<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

require_once __DIR__ . '/vendor/autoload.php';

use Nextcloud\CodingStandard\Config;

$config = new Config();
$config
	->getFinder()
	->in(__DIR__ . '/app/cryptomator_vaults/appinfo')
	->in(__DIR__ . '/app/cryptomator_vaults/lib')
	->in(__DIR__ . '/tests/php')
	->in(__DIR__ . '/tests/stubs')
	->append([__FILE__]);

// php-cs-fixer refuses a PHP newer than the syntax it knows (8.6, until a release that
// knows it): the code keeps to the syntax of PHP 8.2, the oldest it supports.
$config->setUnsupportedPhpVersionAllowed(true);

return $config;
