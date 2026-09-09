#!/usr/bin/env python3
import re
import enterprise_analyzer_locale_core as core


def _localize_bilingual_attrs(source: str, locale: str) -> str:
    """Resolve data-tr/data-en using the correct five-group pattern contract."""
    pattern = re.compile(
        r'(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*\bdata-tr="[^"]*"[^>]*\bdata-en="[^"]*"[^>]*)>)(?P<body>.*?)(</(?P=tag)>)',
        re.S,
    )

    def repl(match: re.Match[str]) -> str:
        attr = re.search(rf'data-{locale}="([^"]*)"', match.group('attrs'))
        return match.group(0) if not attr else match.group(1) + attr.group(1) + match.group(5)

    return pattern.sub(repl, source)


# Patch the core module before main() executes; data-i18n has six groups, data-tr/data-en has five.
core.localize_bilingual_attrs = _localize_bilingual_attrs


if __name__ == '__main__':
    core.main()
