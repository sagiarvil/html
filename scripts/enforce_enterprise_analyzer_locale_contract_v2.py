#!/usr/bin/env python3
"""Final wrapper for the Enterprise Analyzer locale contract.

Keeps the existing deterministic locale materializer intact and extends only the
last two legacy Turkish visible-copy variants that survived the base exact-match
migration. The underlying purity gate remains authoritative and still fails
closed if any additional EN/TR leak exists.
"""

import enforce_enterprise_analyzer_locale_contract as legacy

legacy.EXTRA_EN.update({
    'Varlık Çelişki Defteri (Hallucination Guard)': 'Entity Conflict Ledger (Hallucination Guard)',
    '✓ Eylem: Resmi ürün profilini $99 sabit fiyat ve deterministik yazılım yetkinlikleriyle onaylatın.': '✓ Action: Keep the official product profile aligned with the verified $99 price and deterministic software capabilities.',
})

if __name__ == '__main__':
    legacy.core.main()
