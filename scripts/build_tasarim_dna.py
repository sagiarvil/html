# -*- coding: utf-8 -*-
"""
HTML&HTML — Tasarım DNA'sı ve Bölüm Haritası Oluşturucu
Canonical Single Source of Truth: content.tr.json, tokens.css, dna-components.css
Bölümler: S0 (Header) -> S12 (Final CTA + Footer)
"""
import os
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load_content():
    content_path = os.path.join(ROOT, 'content.tr.json')
    with open(content_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def slot(data, path_str, default=""):
    keys = path_str.split('.')
    cur = data
    for k in keys:
        if isinstance(cur, dict) and k in cur:
            cur = cur[k]
        elif isinstance(cur, list) and k.isdigit() and int(k) < len(cur):
            cur = cur[int(k)]
        else:
            return default if default else f"[DOLDUR: {path_str}]"
    if cur is None or cur == "":
        return default if default else f"[DOLDUR: {path_str}]"
    return cur

def generate_html(is_subpath=False):
    c = load_content()
    prefix = "../../" if is_subpath else ""
    canonical = "https://htmlandhtml.com/tr/tasarim-dna/" if is_subpath else "https://htmlandhtml.com/tasarim-dna.html"

    # FAQ JSON-LD
    faq_items = c.get('faq', {}).get('items', [])
    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": item.get('q', ''),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.get('a', '')
                }
            }
            for item in faq_items if item.get('q') and item.get('a')
        ]
    }
    faq_json_str = json.dumps(faq_schema, ensure_ascii=False, indent=2)

    html = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{slot(c, 'meta.title', 'Tasarım DNA — HTML&HTML')}</title>
<meta name="description" content="{slot(c, 'meta.description')}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical}">
<link rel="stylesheet" href="{prefix}tokens.css">
<link rel="stylesheet" href="{prefix}assets/css/dna-components.css">
<link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2" data-commercial-intent-css="static">
<script src="/assets/js/theme.js?v=7"></script>
<script type="application/ld+json">
{faq_json_str}
</script>
</head>
<body class="dna-body">

<!-- S0 — HEADER -->
<header class="dna-sticky-header" id="dna-header">
  <div class="dna-container dna-header-inner">
    <a href="/" class="dna-wordmark" aria-label="HTML&amp;HTML">HTML&amp;HTML</a>
    <div class="dna-header-right">
      <span class="dna-spy-num" id="dna-spy-num">| 01</span>
      <a href="#scanner" class="dna-btn-primary dna-btn-primary-sm">Kontrol Et</a>
    </div>
  </div>
</header>

<main data-commercial-intent="static">
<div style="display:none;" aria-hidden="true">YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ Tavsiye, sıralama, atıf, trafik, müşteri veya gelir garanti edilmez</div>

<!-- S1 — HERO -->
<section class="dna-section dna-section-dark" id="s1-hero" style="min-height:max(720px, 100svh); display:flex; align-items:center;">
  <!-- Isik huzmesi: 700x1400 donuk (-25deg) --cyan-400 %55 elips, filter:blur(90px) -->
  <div style="position:absolute; width:700px; height:1400px; left:-200px; top:-300px; background:var(--cyan-400); opacity:0.55; border-radius:50%; transform:rotate(-25deg); filter:blur(90px); pointer-events:none; z-index:0;"></div>
  
  <!-- Sagda iki buyuk daire: cap 900px ve 520px, zemin rgba(255,255,255,.06), 1px border -->
  <div style="position:absolute; width:900px; height:900px; right:-250px; top:-150px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.45); pointer-events:none; z-index:0;"></div>
  <div style="position:absolute; width:520px; height:520px; right:150px; bottom:-100px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.45); pointer-events:none; z-index:0;"></div>

  <div class="dna-container" style="position:relative; z-index:1; width:100%;">
    <div class="dna-section-header">
      <span class="dna-section-num">01 / HERO</span>
      <div class="dna-section-header-right">
        <span class="dna-wordmark" style="color:var(--white); font-size:18px;">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">01</span>
      </div>
    </div>

    <div class="dna-split">
      <!-- Sol 7 sutun -->
      <div class="dna-col-7">
        <h1 class="dna-h1">{slot(c, 'hero.h1')}</h1>
        <div class="dna-hero-slogan">{slot(c, 'hero.tagline')}</div>
        <p style="font-size:20px; line-height:1.45; color:rgba(255,255,255,0.85); margin:0 0 40px; max-width:68ch;">{slot(c, 'hero.sub')}</p>
        
        <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap; margin-bottom:40px;">
          <a href="{slot(c, 'hero.ctaLink', '#scanner')}" class="dna-btn-primary dna-btn-primary-light">{slot(c, 'hero.cta')}</a>
          <a href="{slot(c, 'hero.secondaryLink', '#s4-nasil-calisir')}" class="dna-btn-link dna-btn-link-white">{slot(c, 'hero.secondaryCta')} →</a>
        </div>

        <div style="display:flex; gap:24px; flex-wrap:wrap;">
          <div class="dna-trust-tile-wrap">
            <div class="dna-trust-tile">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span style="font-size:13px; line-height:1.3; color:rgba(255,255,255,0.80);">{slot(c, 'hero.trust.0.caption')}</span>
          </div>
          <div class="dna-trust-tile-wrap">
            <div class="dna-trust-tile">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span style="font-size:13px; line-height:1.3; color:rgba(255,255,255,0.80);">{slot(c, 'hero.trust.1.caption')}</span>
          </div>
          <div class="dna-trust-tile-wrap">
            <div class="dna-trust-tile">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <span style="font-size:13px; line-height:1.3; color:rgba(255,255,255,0.80);">{slot(c, 'hero.trust.2.caption')}</span>
          </div>
        </div>
      </div>

      <!-- Sag 5 sutun: DeviceFrame laptop cikti mockup'i -->
      <div class="dna-col-5" style="position:relative;">
        <div class="dna-device-laptop" style="margin:0 auto;">
          <div class="dna-device-laptop-screen">
            <div style="background:#ffffff; border-radius:8px; padding:16px; height:100%; box-sizing:border-box; color:var(--blue-700);">
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(10,31,200,0.1); padding-bottom:12px; margin-bottom:12px;">
                <span style="font-family:'Inter Tight',sans-serif; font-weight:700; font-size:14px;">AI SEARCH DIAGNOSTIC</span>
                <span class="dna-badge-poppins" style="font-size:12px; color:var(--mint-300); background:var(--blue-600); padding:2px 8px; border-radius:4px;">CANLI</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
                <div style="background:var(--bg-0); padding:8px; border-radius:6px;">
                  <div style="font-size:11px; color:var(--ink-600);">AST Bütçesi</div>
                  <div style="font-weight:700; font-size:14px; color:var(--blue-700);">14.1 KB (OK)</div>
                </div>
                <div style="background:var(--bg-0); padding:8px; border-radius:6px;">
                  <div style="font-size:11px; color:var(--ink-600);">Schema.org @graph</div>
                  <div style="font-weight:700; font-size:14px; color:var(--blue-700);">18 Varlık Kilitli</div>
                </div>
              </div>
              <div style="font-size:12px; line-height:1.4; color:var(--ink-600);">
                <code>robots.txt: RFC 9309 Uyumlu</code><br>
                <code>llms.txt: v2 Keşif Aktif</code><br>
                <code>ColBERT MaxSim: Yüksek Entropi</code>
              </div>
            </div>
          </div>
          <div class="dna-device-laptop-base"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- S2 — ACI (YENİ) -->
<section class="dna-section dna-section-light" id="s2-aci">
  <div class="dna-container">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">{slot(c, 'pain.title')}</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">02</span>
      </div>
    </div>

    <div class="dna-split">
      <!-- Sol 6 sutun: 3 alt alta Card-pastel -->
      <div class="dna-col-6" style="display:flex; flex-direction:column; gap:24px;">
        <div class="dna-card-pastel">
          <p class="dna-body-text">{slot(c, 'pain.cards.0')}</p>
        </div>
        <div class="dna-card-pastel">
          <p class="dna-body-text">{slot(c, 'pain.cards.1')}</p>
        </div>
        <div class="dna-card-pastel">
          <p class="dna-body-text">{slot(c, 'pain.cards.2')}</p>
        </div>
      </div>

      <!-- Sag 6 sutun: 1 Card-blue -->
      <div class="dna-col-6">
        <div class="dna-card-blue" style="text-align:center; padding:60px 40px;">
          <div class="dna-lead-bold" style="margin-bottom:24px;">{slot(c, 'pain.headline')}</div>
          <div class="dna-big-number" style="font-family:'Inter Tight',sans-serif; font-weight:800; font-size:96px; line-height:1; letter-spacing:-0.04em; color:var(--white); margin-bottom:12px;">{slot(c, 'pain.number')}</div>
          <div style="font-family:'Inter',sans-serif; font-size:17px; color:var(--white); margin-bottom:24px;">{slot(c, 'pain.unit')}</div>
          <div class="dna-note" style="color:rgba(255,255,255,0.75);">{slot(c, 'pain.note')}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- S3 — ÇÖZÜM = KARAR -->
<section class="dna-section dna-section-alt" id="s3-cozum">
  <div class="dna-container">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">{slot(c, 'solution.title')}</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">03</span>
      </div>
    </div>

    <div class="dna-split" style="margin-bottom:48px;">
      <!-- Sol 5 sutun -->
      <div class="dna-col-5">
        <div style="margin-bottom:16px;">
          <span class="dna-pill dna-chip">{slot(c, 'solution.chip1')}</span>
        </div>
        <div class="dna-card-pastel" style="margin-bottom:24px;">
          <p class="dna-body-text"><strong>{slot(c, 'solution.body.0')}</strong></p>
          <p class="dna-body-text">{slot(c, 'solution.body.1')}</p>
          <p class="dna-body-text">{slot(c, 'solution.body.2')}</p>
        </div>
        <div style="margin-bottom:16px;">
          <span class="dna-pill dna-chip">{slot(c, 'solution.chip2')}</span>
        </div>
        <p class="dna-body-text">{slot(c, 'solution.body2')}</p>
      </div>

      <!-- Sag 7 sutun: Laptop DeviceFrame CircleBackdrop ustunde -->
      <div class="dna-col-7" style="position:relative; min-height:480px; display:flex; align-items:center; justify-content:center;">
        <div class="dna-circle-backdrop" style="right:-100px; top:-50px;"></div>
        <div class="dna-circle-backdrop-sm" style="right:400px; bottom:-30px;"></div>

        <!-- 3 FloatingChip -->
        <div class="dna-floating-chip" style="top:20px; left:10px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>{slot(c, 'solution.chips.0')}</span>
        </div>
        <div class="dna-floating-chip" style="bottom:60px; left:0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          <span>{slot(c, 'solution.chips.1')}</span>
        </div>
        <div class="dna-floating-chip" style="bottom:20px; right:10px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>{slot(c, 'solution.chips.2')}</span>
        </div>

        <!-- Mint Badge-scallop -->
        <div class="dna-badge-scallop dna-badge-mint" style="position:absolute; top:-20px; right:30px;">
          <svg viewBox="0 0 100 100">
            <path d="M50 0 C53 10 57 10 65 5 C70 13 74 15 82 13 C84 22 88 25 96 27 C95 36 98 40 100 50 C98 60 95 64 96 73 C88 75 84 78 82 87 C74 85 70 87 65 95 C57 90 53 90 50 100 C47 90 43 90 35 95 C30 87 26 85 18 87 C16 78 12 75 4 73 C5 64 2 60 0 50 C2 40 5 36 4 27 C12 25 16 22 18 13 C26 15 30 13 35 5 C43 10 47 10 50 0 Z" fill="#7FE3BF"/>
          </svg>
          <span class="dna-badge-scallop-text">KARAR<br>HAZIR</span>
        </div>

        <!-- Laptop DeviceFrame -->
        <div class="dna-device-laptop" style="position:relative; z-index:2; max-width:540px;">
          <div class="dna-device-laptop-screen">
            <div style="background:#ffffff; border-radius:8px; padding:16px; height:100%; box-sizing:border-box;">
              <div style="font-family:'Inter Tight',sans-serif; font-weight:700; font-size:15px; color:var(--blue-700); margin-bottom:12px;">{slot(c, 'solution.panel.title')}</div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:12px;">
                <div style="background:var(--lav-200); padding:8px; border-radius:8px; text-align:center;">
                  <div style="font-size:10px; color:var(--blue-700);">{slot(c, 'solution.panel.metrics.0.label')}</div>
                  <div style="font-weight:800; font-size:16px; color:var(--blue-700);">{slot(c, 'solution.panel.metrics.0.val')}</div>
                </div>
                <div style="background:var(--lav-200); padding:8px; border-radius:8px; text-align:center;">
                  <div style="font-size:10px; color:var(--blue-700);">{slot(c, 'solution.panel.metrics.1.label')}</div>
                  <div style="font-weight:800; font-size:16px; color:var(--blue-700);">{slot(c, 'solution.panel.metrics.1.val')}</div>
                </div>
                <div style="background:var(--lav-200); padding:8px; border-radius:8px; text-align:center;">
                  <div style="font-size:10px; color:var(--blue-700);">{slot(c, 'solution.panel.metrics.2.label')}</div>
                  <div style="font-weight:800; font-size:16px; color:var(--blue-700);">{slot(c, 'solution.panel.metrics.2.val')}</div>
                </div>
              </div>
              <table style="width:100%; border-collapse:collapse; font-size:11px; color:var(--blue-700);">
                <tr style="border-bottom:1px solid var(--lav-300);"><td style="padding:4px 0;">● {slot(c, 'solution.panel.rows.0.step')}</td><td style="text-align:right; font-weight:700;">{slot(c, 'solution.panel.rows.0.status')}</td></tr>
                <tr style="border-bottom:1px solid var(--lav-300);"><td style="padding:4px 0;">● {slot(c, 'solution.panel.rows.1.step')}</td><td style="text-align:right; font-weight:700;">{slot(c, 'solution.panel.rows.1.status')}</td></tr>
                <tr style="border-bottom:1px solid var(--lav-300);"><td style="padding:4px 0;">● {slot(c, 'solution.panel.rows.2.step')}</td><td style="text-align:right; font-weight:700;">{slot(c, 'solution.panel.rows.2.status')}</td></tr>
                <tr><td style="padding:4px 0;">● {slot(c, 'solution.panel.rows.3.step')}</td><td style="text-align:right; font-weight:700;">{slot(c, 'solution.panel.rows.3.status')}</td></tr>
              </table>
            </div>
          </div>
          <div class="dna-device-laptop-base"></div>
        </div>
      </div>
    </div>

    <!-- Alt: Tam sutun Card-blue CTA cubugu (h 88px, radius 32px) -->
    <div class="dna-card-blue" style="border-radius:32px; min-height:88px; padding:20px 40px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px;">
      <div style="display:flex; align-items:center; gap:20px;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--white);"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        <div>
          <div style="font-size:18px; color:var(--white);">{slot(c, 'solution.ctaBar.lead')}</div>
          <div style="font-size:22px; font-weight:700; color:var(--white);">{slot(c, 'solution.ctaBar.action')}</div>
        </div>
      </div>
      <a href="{slot(c, 'solution.ctaBar.btnLink', '#scanner')}" class="dna-btn-primary dna-btn-primary-light">{slot(c, 'solution.ctaBar.btnText')}</a>
    </div>
  </div>
</section>

<!-- S4 — NASIL ÇALIŞIR -->
<section class="dna-section dna-section-light" id="s4-nasil-calisir">
  <div class="dna-container">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">{slot(c, 'how.title')}</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">04</span>
      </div>
    </div>

    <div class="dna-split">
      <!-- Sol 7 sutun: giris metni + 4 CheckPill -->
      <div class="dna-col-7">
        <p class="dna-body-text" style="margin-bottom:32px;">{slot(c, 'how.intro')}</p>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="dna-check-pill">
            <span class="dna-check-circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
            <span>{slot(c, 'how.steps.0')}</span>
          </div>
          <div class="dna-check-pill">
            <span class="dna-check-circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
            <span>{slot(c, 'how.steps.1')}</span>
          </div>
          <div class="dna-check-pill">
            <span class="dna-check-circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
            <span>{slot(c, 'how.steps.2')}</span>
          </div>
          <div class="dna-check-pill">
            <span class="dna-check-circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
            <span>{slot(c, 'how.steps.3')}</span>
          </div>
        </div>
      </div>

      <!-- Sag 5 sutun: Telefon DeviceFrame + BubbleChat + Scallop -->
      <div class="dna-col-5" style="position:relative; display:flex; justify-content:center;">
        <div class="dna-circle-backdrop-sm" style="top:50px; right:20px;"></div>
        
        <!-- Scallop badge sol-alt -->
        <div class="dna-badge-scallop dna-badge-mint" style="position:absolute; bottom:40px; left:20px; z-index:10;">
          <svg viewBox="0 0 100 100">
            <path d="M50 0 C53 10 57 10 65 5 C70 13 74 15 82 13 C84 22 88 25 96 27 C95 36 98 40 100 50 C98 60 95 64 96 73 C88 75 84 78 82 87 C74 85 70 87 65 95 C57 90 53 90 50 100 C47 90 43 90 35 95 C30 87 26 85 18 87 C16 78 12 75 4 73 C5 64 2 60 0 50 C2 40 5 36 4 27 C12 25 16 22 18 13 C26 15 30 13 35 5 C43 10 47 10 50 0 Z" fill="#7FE3BF"/>
          </svg>
          <span class="dna-badge-scallop-text">15 Dk.<br>TESLİM</span>
        </div>

        <!-- Telefon Frame -->
        <div class="dna-device-phone">
          <div class="dna-device-dynamic-island"></div>
          <div class="dna-device-phone-screen">
            <div class="dna-bubble-chat dna-bubble-user">
              {slot(c, 'how.chat.0.text', 'Yapay zeka sitemizi neden kaynak göstermiyor?')}
            </div>
            <div class="dna-bubble-chat dna-bubble-bot">
              {slot(c, 'how.chat.1.text', 'robots.txt AI botlarını engelliyor ve Schema.org varlık verisi eksik.')}
            </div>
            <div class="dna-bubble-chat dna-bubble-user">
              {slot(c, 'how.chat.2.text', 'Düzeltme kodu hazır mı?')}
            </div>
            <div class="dna-bubble-chat dna-bubble-bot">
              {slot(c, 'how.chat.3.text', 'Evet! Fix Pack içinde 30 dosyalık mühendislik kiti hazır.')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- S5 — HİZMET HARİTASI -->
<section class="dna-section dna-section-alt" id="s5-hizmet-haritasi">
  <div class="dna-container">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">{slot(c, 'map.title')}</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">05</span>
      </div>
    </div>

    <!-- Ustte 3 kucuk mockup/kart -->
    <div style="display:flex; gap:24px; margin-bottom:40px; flex-wrap:wrap;">
      <div class="dna-card-pastel" style="flex:1; min-width:240px; padding:20px; border-radius:24px;">
        <span class="dna-badge-poppins" style="font-size:13px;">MODÜL 01–05</span>
        <div class="dna-h3" style="font-size:18px; margin-top:8px;">Tarama &amp; Bot İzinleri</div>
      </div>
      <div class="dna-card-pastel" style="flex:1; min-width:240px; padding:20px; border-radius:24px;">
        <span class="dna-badge-poppins" style="font-size:13px;">MODÜL 06–10</span>
        <div class="dna-h3" style="font-size:18px; margin-top:8px;">Semantik AST &amp; Yapı</div>
      </div>
      <div class="dna-card-pastel" style="flex:1; min-width:240px; padding:20px; border-radius:24px;">
        <span class="dna-badge-poppins" style="font-size:13px;">MODÜL 11–15</span>
        <div class="dna-h3" style="font-size:18px; margin-top:8px;">Güvenlik &amp; Dağıtım</div>
      </div>
    </div>

    <!-- Alt: IndexPill grid (3 sutun, sutun sirasina gore 01-05, 06-10, 11-15) -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px 24px;">
'''

    # Items 15 pieces
    map_items = c.get('map', {}).get('items', [])
    for it in map_items:
        no = it.get('no', '01')
        lbl = it.get('label', '[DOLDUR: map.label]')
        href = it.get('href', '#')
        html += f'''      <a href="{href}" class="dna-index-pill">
        <span class="dna-index-num">{no}</span>
        <span>{lbl}</span>
      </a>\n'''

    html += f'''    </div>
  </div>
</section>

<!-- S6 — UYUMLULUK -->
<section class="dna-section dna-section-light" id="s6-uyumluluk">
  <div class="dna-container">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">Yapay Zeka ve Arama Motoru Uyumluluğu</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">06</span>
      </div>
    </div>

    <div class="dna-split">
      <!-- Sol 6 sutun: Card-pastel icinde 2 blok dikey cizgili -->
      <div class="dna-col-6">
        <div class="dna-card-pastel" style="display:flex; flex-direction:column; gap:32px;">
          <div style="border-left:2px solid var(--blue-700); padding-left:20px;">
            <p style="font-size:18px; line-height:1.5; color:var(--blue-700); margin:0;"><strong>{slot(c, 'compat.blocks.0')}</strong></p>
          </div>
          <div style="border-left:2px solid var(--blue-700); padding-left:20px;">
            <p style="font-size:18px; line-height:1.5; color:var(--blue-700); margin:0;"><strong>{slot(c, 'compat.blocks.1')}</strong></p>
          </div>
        </div>
      </div>

      <!-- Sag 6 sutun: Card-blue icinde 3x3 tile -->
      <div class="dna-col-6">
        <div class="dna-card-blue" style="border-radius:48px; padding:40px;">
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
'''
    compat_tiles = c.get('compat', {}).get('tiles', [])
    for t in compat_tiles:
        name = t if isinstance(t, str) else t.get('name', '')
        html += f'''            <div style="border:1px solid rgba(255,255,255,0.35); border-radius:20px; padding:20px 12px; display:flex; align-items:center; justify-content:center; text-align:center; min-height:90px;">
              <span style="font-size:20px; font-weight:700; color:var(--white);">{name}</span>
            </div>\n'''

    html += f'''          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- S7 — GÜVEN -->
<section class="dna-section" id="s7-guven" style="background:linear-gradient(160deg, #7C8CFA 0%, #C6CCFA 100%); padding:40px 0;">
  <!-- Viewport'tan 24px iceride, radius 48px konteyner -->
  <div style="max-width:calc(100% - 48px); margin:0 auto; border-radius:48px; background:#0B1240; padding:64px clamp(24px, 5vw, 64px); position:relative; overflow:hidden; box-sizing:border-box;">
    
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:48px; flex-wrap:wrap; gap:24px;">
      <div style="max-width:640px;">
        <span class="dna-section-num" style="color:rgba(255,255,255,0.7);">07 / GÜVENLİK STANDARTLARI</span>
        <h2 class="dna-h2" style="color:var(--white); margin:12px 0 0;">{slot(c, 'trust.title')}</h2>
      </div>

      <!-- Sag-ustte altin kilit SVG -->
      <div style="width:140px; height:140px; display:flex; align-items:center; justify-content:center;">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="url(#goldGrad)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F6D765"/>
              <stop offset="55%" stop-color="#E8B923"/>
              <stop offset="100%" stop-color="#B8860F"/>
            </linearGradient>
          </defs>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
    </div>

    <!-- Altta 6 Card-glass yan yana (Desktop 6 sutun, tablet 3, mobil 1) -->
    <div style="display:grid; grid-template-columns:repeat(6, 1fr); gap:16px;">
'''
    trust_cards = c.get('trust', {}).get('cards', [])
    for tc in trust_cards:
        t_icon = tc.get('icon', 'shield')
        t_title = tc.get('title', '[DOLDUR]')
        t_body = tc.get('body', '[DOLDUR]')
        html += f'''      <div class="dna-card-glass" style="min-height:240px; display:flex; flex-direction:column; justify-content:flex-start;">
        <div style="margin-bottom:16px; color:var(--gold-300);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="dna-h3" style="color:var(--white); font-size:18px; margin-bottom:8px;">{t_title}</div>
        <div style="font-size:14px; line-height:1.45; color:rgba(255,255,255,0.85);">{t_body}</div>
      </div>\n'''

    html += f'''    </div>
  </div>
</section>

<!-- S8 — NEDEN BU YÖNTEM -->
<section class="dna-section dna-section-light" id="s8-neden-biz">
  <div class="dna-container">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">Neden HTML&amp;HTML Karar Sistemi?</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">08</span>
      </div>
    </div>

    <div class="dna-split">
      <!-- Sol 5 sutun: Buyuk daire icinde iddia metni, ikincil daire kisa slogan -->
      <div class="dna-col-5" style="position:relative; height:420px; display:flex; align-items:center; justify-content:center;">
        <div style="width:320px; height:320px; border-radius:50%; background:var(--lav-200); display:flex; align-items:center; justify-content:center; text-align:center; padding:32px; box-sizing:border-box;">
          <div style="font-family:'Inter',sans-serif; font-weight:500; font-size:26px; line-height:1.2; color:var(--blue-700);">{slot(c, 'why.claim')}</div>
        </div>
        <div style="position:absolute; width:180px; height:180px; border-radius:50%; background:var(--lav-300); bottom:10px; right:10px; display:flex; align-items:center; justify-content:center; text-align:center; padding:20px; box-sizing:border-box; box-shadow:var(--sh-float);">
          <div style="font-family:'Inter Tight',sans-serif; font-weight:700; font-size:17px; line-height:1.2; color:var(--blue-700);">{slot(c, 'why.sub')}</div>
        </div>
      </div>

      <!-- Sag 7 sutun: 7 satir Pill solda 36px numara dairesi -->
      <div class="dna-col-7" style="display:flex; flex-direction:column; gap:12px;">
'''
    why_items = c.get('why', {}).get('items', [])
    for idx, wi in enumerate(why_items, 1):
        html += f'''        <div style="min-height:56px; border-radius:var(--r-pill); background:var(--lav-300); padding:8px 24px 8px 12px; display:flex; align-items:center; gap:16px; box-sizing:border-box;">
          <div style="width:36px; height:36px; min-width:36px; border-radius:50%; background:var(--blue-700); color:var(--white); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;">{idx}</div>
          <span style="font-family:'Inter',sans-serif; font-weight:500; font-size:16px; color:var(--blue-700);">{wi}</span>
        </div>\n'''

    html += f'''      </div>
    </div>
  </div>
</section>

<!-- S9 — KANIT / REFERANS -->
<section class="dna-section dna-section-alt" id="s9-kanit">
  <div class="dna-container">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">Somut Çıktı ve Kanıt Örnekleri</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">09</span>
      </div>
    </div>

    <!-- 3 adet Card-pastel ornek cikti karti -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:24px;">
'''
    proof_samples = c.get('proof', {}).get('samples', [])
    for ps in proof_samples:
        s_title = ps.get('title', '[DOLDUR]')
        s_desc = ps.get('desc', '[DOLDUR]')
        s_tag = ps.get('tag', 'RAPOR KANITI')
        html += f'''      <div class="dna-card-pastel" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <!-- 16:10 cikti mockup alani -->
          <div style="aspect-ratio:16/10; background:#ffffff; border-radius:16px; padding:16px; margin-bottom:20px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid rgba(10,31,200,0.1);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="dna-badge-poppins" style="font-size:11px; color:var(--blue-700);">{s_tag}</span>
              <span style="font-size:11px; color:var(--ink-600);">W3C / RFC</span>
            </div>
            <div style="font-family:'Inter',sans-serif; font-size:13px; color:var(--blue-700); line-height:1.4;">
              <code>canonical: OK</code><br>
              <code>ast_bytes: 14,120 / 14,336</code><br>
              <code>colbert_maxsim: 0.88</code>
            </div>
          </div>
          <div class="dna-h3" style="font-size:20px;">{s_title}</div>
          <p class="dna-body-text" style="font-size:16px;">{s_desc}</p>
        </div>
      </div>\n'''

    html += f'''    </div>
  </div>
</section>

<!-- S10 — TEKLİF -->
<section class="dna-section dna-section-light" id="s10-teklif">
  <div class="dna-container">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">Uygulama ve Fiyatlandırma Teklifi</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">10</span>
      </div>
    </div>

    <!-- Ust karsilastirma bandi -->
    <div class="dna-card-blue" style="border-radius:24px; padding:24px 32px; margin-bottom:32px; text-align:center;">
      <div class="dna-lead-bold">{slot(c, 'offer.anchor')}</div>
    </div>

    <!-- Fiyat Kartlari (One cikan Card-blue) -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px; max-width:960px; margin:0 auto 32px;">
      <!-- Plan 0: Ucretsiz -->
      <div class="dna-card-pastel" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div class="dna-h3" style="font-size:24px; margin-bottom:12px;">{slot(c, 'offer.plans.0.name')}</div>
          <div style="font-family:'Inter Tight',sans-serif; font-weight:800; font-size:56px; color:var(--blue-700); margin-bottom:24px;">{slot(c, 'offer.plans.0.price')}</div>
          <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:32px;">
'''
    p0_bullets = c.get('offer', {}).get('plans', [{}, {}])[0].get('bullets', [])
    for b in p0_bullets:
        html += f'''            <div style="display:flex; align-items:center; gap:8px; font-size:16px;">
              <span style="color:var(--blue-700); font-weight:700;">✓</span>
              <span>{b}</span>
            </div>\n'''

    html += f'''          </div>
        </div>
        <a href="#scanner" class="dna-btn-primary" style="width:100%; box-sizing:border-box;">{slot(c, 'offer.plans.0.cta')}</a>
      </div>

      <!-- Plan 1: One cikan Card-blue $99 -->
      <div class="dna-card-blue" style="display:flex; flex-direction:column; justify-content:space-between; position:relative;">
        <!-- Altin rozet -->
        <div style="position:absolute; top:20px; right:24px; background:var(--gold-500); color:var(--blue-900); font-weight:800; font-size:12px; padding:4px 12px; border-radius:999px;">ÖNERİLEN</div>
        <div>
          <div class="dna-h3" style="color:var(--white); font-size:24px; margin-bottom:12px;">{slot(c, 'offer.plans.1.name')}</div>
          <div style="font-family:'Inter Tight',sans-serif; font-weight:800; font-size:56px; color:var(--white); margin-bottom:24px;">{slot(c, 'offer.plans.1.price')}</div>
          <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:32px;">
'''
    p1_bullets = c.get('offer', {}).get('plans', [{}, {}])[1].get('bullets', [])
    for b in p1_bullets:
        html += f'''            <div style="display:flex; align-items:center; gap:8px; font-size:16px; color:var(--white);">
              <span style="color:var(--gold-300); font-weight:700;">✓</span>
              <span>{b}</span>
            </div>\n'''

    html += f'''          </div>
        </div>
        <a href="/tr/fiyatlandirma/" class="dna-btn-primary dna-btn-primary-light" style="width:100%; box-sizing:border-box;">{slot(c, 'offer.plans.1.cta')}</a>
      </div>
    </div>

    <!-- Altin risk cip -->
    <div style="text-align:center;">
      <span class="dna-pill" style="gap:10px; background:var(--lav-200);">
        <span style="color:var(--gold-700); font-weight:800;">★</span>
        <span>{slot(c, 'offer.riskChip')}</span>
      </span>
    </div>
  </div>
</section>

<!-- S11 — SSS (ACCORDION) -->
<section class="dna-section dna-section-alt" id="s11-sss">
  <div class="dna-container" style="max-width:960px;">
    <div class="dna-section-header">
      <h2 class="dna-h2" style="margin:0;">Sıkça Sorulan Sorular</h2>
      <div class="dna-section-header-right">
        <span class="dna-wordmark">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">11</span>
      </div>
    </div>

    <div class="dna-accordion-list">
'''
    faq_items = c.get('faq', {}).get('items', [])
    for f_idx, f_it in enumerate(faq_items):
        q = f_it.get('q', '[DOLDUR: soru]')
        a = f_it.get('a', '[DOLDUR: cevap]')
        is_first = "true" if f_idx == 0 else "false"
        html += f'''      <div class="dna-accordion-item">
        <button type="button" class="dna-accordion-trigger" aria-expanded="{is_first}" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true')">
          <span>{q}</span>
          <span style="font-size:24px;">+</span>
        </button>
        <div class="dna-accordion-content">
          <p>{a}</p>
        </div>
      </div>\n'''

    html += f'''    </div>
  </div>
</section>

<!-- S12 — FINAL CTA + FOOTER -->
<section class="dna-section dna-section-dark" id="s12-final-cta" style="min-height:560px; position:relative; overflow:hidden;">
  <!-- Sagdan gelen buyuk yay maskesi: 1px beyaz %40 kenar -->
  <div style="position:absolute; width:800px; height:800px; right:-200px; bottom:-200px; border-radius:50%; border:1px solid rgba(255,255,255,0.40); background:rgba(255,255,255,0.04); pointer-events:none;"></div>

  <div class="dna-container" style="position:relative; z-index:1;">
    <div class="dna-section-header">
      <span class="dna-section-num">12 / NİHAİ DÖNÜŞÜM</span>
      <div class="dna-section-header-right">
        <span class="dna-wordmark" style="color:var(--white);">HTML&amp;HTML</span>
        <div class="dna-section-divider"></div>
        <span class="dna-section-num">12</span>
      </div>
    </div>

    <div style="max-width:800px; margin-bottom:48px;">
      <h2 class="dna-h1" style="font-size:64px; margin-bottom:24px;">{slot(c, 'finalCta.h2')}</h2>
      <a href="#scanner" class="dna-btn-primary dna-btn-primary-light" style="font-size:20px; height:64px; padding:0 40px;">{slot(c, 'finalCta.btnText')}</a>
    </div>

    <!-- Alt cizgi: Sol-altta 3 TrustTile serisi; Sag-altta 3 iletisim satiri -->
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:32px; border-top:1px solid rgba(255,255,255,0.15); padding-top:40px;">
      <div style="display:flex; gap:24px; flex-wrap:wrap;">
        <div class="dna-trust-tile-wrap">
          <div class="dna-trust-tile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span style="font-size:12px; color:rgba(255,255,255,0.8);">{slot(c, 'hero.trust.0.caption')}</span>
        </div>
        <div class="dna-trust-tile-wrap">
          <div class="dna-trust-tile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <span style="font-size:12px; color:rgba(255,255,255,0.8);">{slot(c, 'hero.trust.1.caption')}</span>
        </div>
        <div class="dna-trust-tile-wrap">
          <div class="dna-trust-tile">
            <div style="font-weight:800; font-size:18px;">$99</div>
          </div>
          <span style="font-size:12px; color:rgba(255,255,255,0.8);">{slot(c, 'hero.trust.2.caption')}</span>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:44px; height:44px; border-radius:12px; background:var(--glass-bg); border:var(--glass-border); display:flex; align-items:center; justify-content:center; color:var(--white);">✉</div>
          <div class="dna-section-divider"></div>
          <a href="mailto:info@htmlandhtml.com" style="color:var(--white); font-weight:700; font-size:18px; text-decoration:none;">info@htmlandhtml.com</a>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:44px; height:44px; border-radius:12px; background:var(--glass-bg); border:var(--glass-border); display:flex; align-items:center; justify-content:center; color:var(--white);">☎</div>
          <div class="dna-section-divider"></div>
          <a href="https://wa.me/905000000000" style="color:var(--white); font-weight:700; font-size:18px; text-decoration:none;">WhatsApp Destek</a>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:44px; height:44px; border-radius:12px; background:var(--glass-bg); border:var(--glass-border); display:flex; align-items:center; justify-content:center; color:var(--white);">in</div>
          <div class="dna-section-divider"></div>
          <a href="https://linkedin.com/company/htmlandhtml" style="color:var(--white); font-weight:700; font-size:18px; text-decoration:none;">LinkedIn @htmlandhtml</a>
        </div>
      </div>
    </div>
  </div>
</section>

</main>

<!-- FOOTER -->
<footer style="background:#050724; color:rgba(255,255,255,0.7); padding:32px 0; font-size:13px; line-height:1.5;">
  <div class="dna-container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
    <div>{slot(c, 'legal.disclaimer')}</div>
    <div style="display:flex; gap:16px;">
      <a href="/tr/gizlilik/" style="color:rgba(255,255,255,0.7); text-decoration:underline;">{slot(c, 'legal.kvkk')}</a>
      <a href="/tr/kullanim-kosullari/" style="color:rgba(255,255,255,0.7); text-decoration:underline;">Kullanım Koşulları</a>
      <span>{slot(c, 'legal.copyright')}</span>
    </div>
  </div>
</footer>

<script src="{prefix}assets/js/dna-scroll-spy.js"></script>
</body>
</html>
'''
    return html

def main():
    root_html = generate_html(is_subpath=False)
    sub_html = generate_html(is_subpath=True)

    root_file = os.path.join(ROOT, 'tasarim-dna.html')
    with open(root_file, 'w', encoding='utf-8') as f:
        f.write(root_html)
    print(f"Generated: {root_file}")

    tr_dir = os.path.join(ROOT, 'tr', 'tasarim-dna')
    os.makedirs(tr_dir, exist_ok=True)
    tr_file = os.path.join(tr_dir, 'index.html')
    with open(tr_file, 'w', encoding='utf-8') as f:
        f.write(sub_html)
    print(f"Generated: {tr_file}")

if __name__ == '__main__':
    main()
