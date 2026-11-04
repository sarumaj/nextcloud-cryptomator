/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The app's translations (l10n/), unescaped: the integration only ever sets
 * text, never HTML.
 */
import { translate, translatePlural } from '@nextcloud/l10n'

export const APP = 'cryptomator_vaults'

export function t(text, vars) {
	return translate(APP, text, vars, undefined, { escape: false })
}

/** A text by a number (%n in it), in the language's plural form. */
export function n(singular, plural, count, vars) {
	return translatePlural(APP, singular, plural, count, vars, { escape: false })
}
