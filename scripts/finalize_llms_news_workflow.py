#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
WF=ROOT/'.github/workflows/llms-news.yml'
WF.write_text('''name: llms-txt-news

on:
  schedule:
    # Europe/Istanbul is UTC+3 year-round: 00:00 UTC = 03:00 local.
    - cron: '0 0 * * *'
  workflow_dispatch:

permissions:
  contents: write

concurrency:
  group: htmlandhtml-llms-news
  cancel-in-progress: false

jobs:
  refresh:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v5
        with:
          ref: main
          fetch-depth: 1
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - name: Discover and editorialize relevant AI Search updates
        env:
          NEWS_EDITORIAL_OPENAI_KEY: ${{ secrets.NEWS_EDITORIAL_OPENAI_KEY }}
          NEWS_EDITORIAL_MODEL: gpt-5.6-luna
        shell: bash
        run: |
          set -euo pipefail
          if [ -z "${NEWS_EDITORIAL_OPENAI_KEY:-}" ]; then
            echo '::warning title=LLMS News editorial credential missing::NEWS_EDITORIAL_OPENAI_KEY is not configured. Existing news will still be rebuilt and validated; no new AI-written brief can be published.'
            python3 scripts/update_llms_news.py
          else
            python3 scripts/update_llms_news.py --require-editorial-key
          fi
      - name: Detect validated editorial change
        id: editorial
        shell: bash
        run: |
          if git diff --quiet -- data/llms-news.json; then
            echo 'changed=false' >> "$GITHUB_OUTPUT"
            echo 'LLMS_NEWS_NO_CHANGE: no new validated bilingual brief.'
          else
            echo 'changed=true' >> "$GITHUB_OUTPUT"
          fi
      - name: Materialize bilingual news pages and machine-readable discovery
        run: python3 scripts/build_llms_news.py
      - name: Validate news editorial and SEO contract
        run: node tests/integrity/llms-news.test.mjs
      - name: Commit validated update
        if: steps.editorial.outputs.changed == 'true'
        shell: bash
        run: |
          set -euo pipefail
          git config user.name 'htmlandhtml-news-bot'
          git config user.email 'htmlandhtml-news-bot@users.noreply.github.com'
          git add data/llms-news.json tr/llms-txt-haberler en/llms-txt-news assets/news sitemap.xml llms.txt index.md
          git commit -m 'content: refresh LLMS.TXT News intelligence'
          git push origin HEAD:main
''',encoding='utf-8')
print('LLMS_NEWS_WORKFLOW_PASS: 03:00 schedule always rebuilds/validates; editorial publishing activates when credential exists.')
