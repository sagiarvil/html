#!/bin/bash
sed -i '' 's/https:\/\/htmlandhtml.com\/sitemap.xml/https:\/\/htmlandhtml.com\/sitemaps\/pages-tr.xml/g' /Users/macair1/projects/html/.github/workflows/ai-authority-live-smoke.yml
sed -i '' 's/-o \/tmp\/sitemap.xml/-o \/tmp\/pages-tr.xml/g' /Users/macair1/projects/html/.github/workflows/ai-authority-live-smoke.yml
sed -i '' 's/\/tmp\/sitemap.xml/\/tmp\/pages-tr.xml/g' /Users/macair1/projects/html/.github/workflows/ai-authority-live-smoke.yml
