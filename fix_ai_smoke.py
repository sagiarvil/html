with open('/Users/macair1/projects/html/.github/workflows/ai-authority-live-smoke.yml', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    'article_url="$(grep -oE \'https://htmlandhtml\\.com/tr/llms-txt-haberler/[a-z0-9-]+/\' /tmp/pages-tr.xml | sed -n \'1p\')"',
    'curl -fLsS --connect-timeout 8 --max-time 25 https://htmlandhtml.com/sitemaps/articles-tr.xml -o /tmp/articles-tr.xml\n          article_url="$(grep -oE \'https://htmlandhtml\\\\.com/tr/llms-txt-haberler/[a-z0-9-]+/\' /tmp/articles-tr.xml | sed -n \'1p\')"'
)

with open('/Users/macair1/projects/html/.github/workflows/ai-authority-live-smoke.yml', 'w', encoding='utf-8') as f:
    f.write(text)
