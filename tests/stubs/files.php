<?php

declare(strict_types=1);

// SPDX-License-Identifier: AGPL-3.0-or-later

// The Files app's event the app listens to: part of Nextcloud's server, not of its public API
// (nextcloud/ocp), so Psalm knows it from this stub alone.

namespace OCA\Files\Event;

use OCP\EventDispatcher\Event;

class LoadAdditionalScriptsEvent extends Event {
}
