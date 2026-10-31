/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The app's translations (l10n/), unescaped: the integration only ever sets
 * text, never HTML.
 */
import { translate } from '@nextcloud/l10n'

export const APP = 'cryptomator_vaults'

export function t(text, vars) {
	return translate(APP, text, vars, undefined, { escape: false })
}
