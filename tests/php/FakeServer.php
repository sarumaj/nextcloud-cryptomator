<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\CryptomatorVaults\Tests;

use OCP\AppFramework\IAppContainer;
use Psr\Container\ContainerInterface;
use RuntimeException;

require_once __DIR__ . '/../stubs/server.php';

/**
 * The server's container (\OC::$server) as the public API's classes ask it: the services a
 * test gives, and an app container for OCP\AppFramework\App. Anything else fails the test,
 * so that a call into the server that the test does not expect is seen.
 */
class FakeServer implements ContainerInterface {
	/**
	 * @param array<string, object> $services
	 */
	public function __construct(
		private array $services,
		private ?IAppContainer $appContainer = null,
	) {
	}

	/** Makes this the server for OCP\Server::get() and App, until the next one. */
	public function install(): self {
		\OC::$server = $this;
		return $this;
	}

	public function get(string $id): object {
		return $this->services[$id] ?? throw new RuntimeException("No service $id in the test's server");
	}

	public function has(string $id): bool {
		return isset($this->services[$id]);
	}

	public function getRegisteredAppContainer(string $appName): IAppContainer {
		return $this->appContainer ?? throw new RuntimeException("No app container for $appName in the test's server");
	}
}
