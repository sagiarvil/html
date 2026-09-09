#!/usr/bin/env python3
"""Run the canonical Enterprise Analyzer locale contract with two legacy-copy aliases."""
import enforce_enterprise_analyzer_locale_contract as contract

contract.EXTRA_EN.update({
    'Varlık Çelişki Defteri (Hallucination Guard)': 'Entity Conflict Ledger (Hallucination Guard)',
    '✓ Eylem: Resmi ürün profilini $99 sabit fiyat ve deterministik yazılım yetkinlikleriyle onaylatın.': '✓ Action: Keep the official product profile aligned with verified $99 pricing and measured software capabilities.',
})

if __name__ == '__main__':
    contract.core.main()
