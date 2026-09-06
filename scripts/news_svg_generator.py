#!/usr/bin/env python3
"""Next-generation vector SVG generator for LLMS.TXT News covers.

Implements rich silhouette drawings and narrative visual stories representing the 9 pillars:
1. SEO (Technical SEO & Crawler Protocol)
2. GEO (Generative Engine Optimization & Latent Consensus)
3. AEO (Answer Engine Optimization & Caliper Extraction)
4. LLMO (Large Language Model Optimization & Transformer Attention)
5. AAO (Autonomous Agent Optimization & WebMCP Tool Protocol)
6. RAG (Retrieval-Augmented Generation & Vector Manifolds)
7. Sitemaps (Hierarchical Discovery Mesh & Crawl Routing)
8. schema.org (Linked Data RDF Graph & JSON-LD Entity Network)
9. E-E-A-T (Cryptographic Provenance, C2PA & Trust Verification)
"""
import hashlib, html

def esc(v):
    return html.escape(str(v or ''), quote=True)

def get_pillar_meta(topic):
    t = (topic or 'LLMO').upper()
    if 'SEO' in t or 'CRAWLER' in t:
        return 'SEO', 'TECHNICAL SEO & CRAWLER INFRASTRUCTURE', '#F59E0B', '#38BDF8', '#64748B', 'rgba(245, 158, 11, 0.25)'
    elif 'GEO' in t:
        return 'GEO', 'GENERATIVE ENGINE OPTIMIZATION & CONSENSUS', '#A855F7', '#EC4899', '#38BDF8', 'rgba(168, 85, 247, 0.25)'
    elif 'AEO' in t or 'ANSWER' in t:
        return 'AEO', 'ANSWER ENGINE OPTIMIZATION & CALIPER EXTRACTION', '#F59E0B', '#EAB308', '#FDE047', 'rgba(245, 158, 11, 0.25)'
    elif 'AAO' in t or 'AGENT' in t:
        return 'AAO', 'AUTONOMOUS AGENT OPTIMIZATION & WebMCP TOOLS', '#10B981', '#14B8A6', '#34D399', 'rgba(16, 185, 129, 0.25)'
    elif 'RAG' in t or 'RETRIEVAL' in t:
        return 'RAG', 'RETRIEVAL-AUGMENTED GENERATION & VECTOR MANIFOLDS', '#F43F5E', '#38BDF8', '#FB7185', 'rgba(244, 63, 94, 0.25)'
    elif 'SITEMAP' in t or 'DISCOVERY' in t:
        return 'Sitemaps', 'HIERARCHICAL DISCOVERY MESH & CRAWL ROUTING', '#06B6D4', '#3B82F6', '#60A5FA', 'rgba(6, 182, 212, 0.25)'
    elif 'SCHEMA' in t or 'ENTITY' in t:
        return 'schema.org', 'LINKED DATA RDF & JSON-LD ENTITY NETWORK', '#84CC16', '#0284C7', '#A3E635', 'rgba(132, 204, 22, 0.25)'
    elif 'EEAT' in t or 'TRUST' in t:
        return 'E-E-A-T', 'CRYPTOGRAPHIC PROVENANCE & TRUST VERIFICATION', '#E2E8F0', '#F59E0B', '#FCD34D', 'rgba(245, 158, 11, 0.25)'
    else: # LLMO or AI_INFERENCE
        return 'LLMO', 'LARGE LANGUAGE MODEL OPTIMIZATION & ATTENTION', '#38BDF8', '#818CF8', '#6366F1', 'rgba(56, 189, 248, 0.25)'


def render_silhouette_art(pillar_key, c1, c2, c3, seed):
    """Generates unique silhouette figure and narrative scene for each of the 9 pillars."""
    v_off = (seed % 14) - 7

    if pillar_key == 'SEO':
        return f'''
    <!-- Pillar 1: SEO — Engineer Silhouette & Web Crawler Spider inspecting DOM/Server Rack -->
    <g id="scene-seo" transform="translate(0, {v_off})">
      <!-- Server Rack Stack (Left Background) -->
      <g opacity="0.45">
        <rect x="180" y="160" width="140" height="340" rx="8" fill="#0A0E17" stroke="{c1}" stroke-width="1.5"/>
        <line x1="195" y1="210" x2="305" y2="210" stroke="{c1}" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="195" y1="260" x2="305" y2="260" stroke="{c1}" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="195" y1="310" x2="305" y2="310" stroke="{c1}" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="195" y1="360" x2="305" y2="360" stroke="{c1}" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="195" y1="410" x2="305" y2="410" stroke="{c1}" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="195" y1="460" x2="305" y2="460" stroke="{c1}" stroke-width="1" stroke-dasharray="3 3"/>
        <circle cx="205" cy="185" r="3" fill="#10B981"/><circle cx="217" cy="185" r="3" fill="#10B981"/><circle cx="229" cy="185" r="3" fill="{c1}"/>
        <circle cx="205" cy="235" r="3" fill="#10B981"/><circle cx="217" cy="235" r="3" fill="{c1}"/><circle cx="229" cy="235" r="3" fill="#10B981"/>
        <circle cx="205" cy="285" r="3" fill="#10B981"/><circle cx="217" cy="285" r="3" fill="#10B981"/><circle cx="229" cy="285" r="3" fill="#10B981"/>
        <circle cx="205" cy="335" r="3" fill="{c1}"/><circle cx="217" cy="335" r="3" fill="#10B981"/><circle cx="229" cy="335" r="3" fill="{c1}"/>
        <circle cx="205" cy="385" r="3" fill="#10B981"/><circle cx="217" cy="385" r="3" fill="#10B981"/><circle cx="229" cy="385" r="3" fill="#10B981"/>
      </g>

      <!-- Center: Autonomous Cyber Crawler Spider Bot Silhouette -->
      <g transform="translate(600, 310)">
        <ellipse cx="0" cy="0" rx="36" ry="24" fill="#0E1320" stroke="{c1}" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="14" fill="{c1}" fill-opacity="0.3"/>
        <circle cx="0" cy="0" r="6" fill="{c1}"/>
        <polygon points="0,0 -160,140 160,140" fill="url(#beam-seo)" opacity="0.35"/>
        <path d="M-28,-10 Q-60,-50 -95,-35 Q-130,-20 -150,25" fill="none" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M-34,0 Q-80,-15 -120,15 Q-145,45 -165,85" fill="none" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M-28,12 Q-65,40 -95,65 Q-120,95 -135,130" fill="none" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M28,-10 Q60,-50 95,-35 Q130,-20 150,25" fill="none" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M34,0 Q80,-15 120,15 Q145,45 165,85" fill="none" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M28,12 Q65,40 95,65 Q120,95 135,130" fill="none" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="-95" cy="-35" r="4" fill="{c2}"/><circle cx="95" cy="-35" r="4" fill="{c2}"/>
        <circle cx="-120" cy="15" r="4" fill="{c2}"/><circle cx="120" cy="15" r="4" fill="{c2}"/>
        <circle cx="-95" cy="65" r="4" fill="{c2}"/><circle cx="95" cy="65" r="4" fill="{c2}"/>
      </g>

      <!-- Right: Technical SEO Engineer Silhouette -->
      <g transform="translate(930, 240)">
        <circle cx="0" cy="0" r="26" fill="#0A0E17" stroke="{c2}" stroke-width="2"/>
        <path d="M-8,-2 L18,-2 L14,6 L-6,6 Z" fill="{c1}"/>
        <path d="M-10,26 L-24,85 L26,85 L14,26 Z" fill="#0A0E17" stroke="{c2}" stroke-width="1.8"/>
        <path d="M-24,85 L-55,130 L-25,145" fill="none" stroke="{c2}" stroke-width="4" stroke-linecap="round"/>
        <path d="M26,85 L-10,130 L15,145" fill="none" stroke="{c2}" stroke-width="4" stroke-linecap="round"/>
        <path d="M-24,85 L-28,210 M26,85 L28,210" stroke="#0A0E17" stroke-width="16" stroke-linecap="round"/>
        <rect x="-85" y="145" width="110" height="60" rx="6" fill="#070A10" stroke="{c1}" stroke-width="1.5"/>
        <line x1="-75" y1="160" x2="-10" y2="160" stroke="{c1}" stroke-width="1.5"/>
        <line x1="-75" y1="172" x2="-25" y2="172" stroke="{c2}" stroke-width="1.5"/>
        <line x1="-75" y1="184" x2="-35" y2="184" stroke="{c1}" stroke-width="1.5"/>
      </g>

      <!-- Telemetry Tags Floating in Space -->
      <g font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700">
        <rect x="360" y="180" width="140" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="372" y="196" fill="{c1}">STATUS: 200 OK</text>
        <rect x="700" y="180" width="165" height="24" rx="4" fill="#0A0D15" stroke="{c2}" stroke-width="1"/>
        <text x="712" y="196" fill="{c2}">ROBOTS: ALLOW_AI</text>
        <rect x="510" y="470" width="180" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="522" y="486" fill="{c1}">CRAWL_INDEX: ACTIVE</text>
      </g>
    </g>'''

    elif pillar_key == 'GEO':
        return f'''
    <!-- Pillar 2: GEO — Strategist Silhouette & 3D Multi-Model Generative Consensus Lattice -->
    <g id="scene-geo" transform="translate(0, {v_off})">
      <g transform="translate(600, 320)">
        <circle cx="0" cy="0" r="170" fill="none" stroke="{c1}" stroke-width="1.5" stroke-dasharray="4 8" opacity="0.6"/>
        <ellipse cx="0" cy="0" rx="170" ry="60" fill="none" stroke="{c2}" stroke-width="2" opacity="0.8"/>
        <ellipse cx="0" cy="0" rx="170" ry="60" fill="none" stroke="{c1}" stroke-width="1.5" transform="rotate(60)" opacity="0.7"/>
        <ellipse cx="0" cy="0" rx="170" ry="60" fill="none" stroke="{c3}" stroke-width="1.5" transform="rotate(-60)" opacity="0.7"/>
        
        <circle cx="0" cy="0" r="42" fill="#0E1220" stroke="{c1}" stroke-width="3"/>
        <circle cx="0" cy="0" r="28" fill="url(#radial-geo)"/>
        <circle cx="0" cy="0" r="10" fill="#FFFFFF"/>
        <text x="0" y="5" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="900" text-anchor="middle" fill="{c1}">ENTITY</text>
        
        <g transform="translate(-160, -90)">
          <circle cx="0" cy="0" r="22" fill="#0A0D18" stroke="{c2}" stroke-width="2"/>
          <text x="0" y="4" font-family="ui-monospace,Menlo,monospace" font-size="8" font-weight="800" text-anchor="middle" fill="{c2}">GPT-4</text>
          <line x1="16" y1="12" x2="135" y2="75" stroke="{c2}" stroke-width="1.8" stroke-dasharray="3 3"/>
        </g>
        <g transform="translate(160, -90)">
          <circle cx="0" cy="0" r="22" fill="#0A0D18" stroke="{c1}" stroke-width="2"/>
          <text x="0" y="4" font-family="ui-monospace,Menlo,monospace" font-size="8" font-weight="800" text-anchor="middle" fill="{c1}">CLAUDE</text>
          <line x1="-16" y1="12" x2="-135" y2="75" stroke="{c1}" stroke-width="1.8" stroke-dasharray="3 3"/>
        </g>
        <g transform="translate(0, 150)">
          <circle cx="0" cy="0" r="22" fill="#0A0D18" stroke="{c3}" stroke-width="2"/>
          <text x="0" y="4" font-family="ui-monospace,Menlo,monospace" font-size="8" font-weight="800" text-anchor="middle" fill="{c3}">PPLX</text>
          <line x1="0" y1="-20" x2="0" y2="-110" stroke="{c3}" stroke-width="1.8" stroke-dasharray="3 3"/>
        </g>
      </g>

      <g transform="translate(240, 240)">
        <line x1="-60" y1="210" x2="80" y2="210" stroke="{c1}" stroke-width="3"/>
        <line x1="-40" y1="210" x2="-40" y2="270" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="60" y1="210" x2="60" y2="270" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <circle cx="0" cy="30" r="24" fill="#0A0E17" stroke="{c1}" stroke-width="2"/>
        <path d="M-8,54 L-28,140 L28,140 L12,54 Z" fill="#0A0E17" stroke="{c1}" stroke-width="1.8"/>
        <path d="M12,75 L65,85 L105,70" fill="none" stroke="{c2}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="105" cy="70" r="5" fill="{c2}"/>
        <path d="M-16,140 L-20,210 M16,140 L20,210" stroke="#0A0E17" stroke-width="14" stroke-linecap="round"/>
      </g>

      <g font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700">
        <rect x="740" y="440" width="190" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="752" y="456" fill="{c1}">CONSENSUS_QID: 0.985</text>
        <rect x="220" y="160" width="170" height="24" rx="4" fill="#0A0D15" stroke="{c2}" stroke-width="1"/>
        <text x="232" y="176" fill="{c2}">LATENT_ANCHOR: TOP_1</text>
      </g>
    </g>'''

    elif pillar_key == 'AEO':
        return f'''
    <!-- Pillar 3: AEO — Precision Quotation Caliper Extracting Direct Answer from Knowledge Stream -->
    <g id="scene-aeo" transform="translate(0, {v_off})">
      <g transform="translate(480, 200)">
        <rect x="0" y="0" width="240" height="260" rx="8" fill="#0B0F1A" stroke="{c1}" stroke-width="1.8"/>
        <line x1="20" y1="30" x2="120" y2="30" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <line x1="20" y1="60" x2="220" y2="60" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="20" y1="85" x2="220" y2="85" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <rect x="12" y="105" width="216" height="50" rx="4" fill="{c1}" fill-opacity="0.18" stroke="{c1}" stroke-width="1.5"/>
        <line x1="20" y1="122" x2="200" y2="122" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <line x1="20" y1="138" x2="160" y2="138" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <line x1="20" y1="180" x2="220" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="20" y1="205" x2="180" y2="205" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="20" y1="230" x2="140" y2="230" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      </g>

      <g transform="translate(600, 330)">
        <path d="M-135,-30 L-115,-30 L-115,30 L-135,30" fill="none" stroke="{c2}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M135,-30 L115,-30 L115,30 L135,30" fill="none" stroke="{c2}" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="-135" y1="-45" x2="135" y2="-45" stroke="{c2}" stroke-width="2"/>
        <line x1="0" y1="-52" x2="0" y2="-38" stroke="{c1}" stroke-width="3"/>
        <circle cx="0" cy="-45" r="5" fill="{c1}"/>
      </g>

      <g transform="translate(800, 160)">
        <path d="M0,20 Q0,0 20,0 L180,0 Q200,0 200,20 L200,100 Q200,120 180,120 L40,120 L10,145 L15,120 L20,120 Q0,120 0,100 Z" fill="#0A0E17" stroke="{c1}" stroke-width="2"/>
        <rect x="18" y="16" width="36" height="18" rx="4" fill="{c1}"/>
        <text x="36" y="29" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="900" text-anchor="middle" fill="#07080A">[1]</text>
        <line x1="64" y1="25" x2="175" y2="25" stroke="{c1}" stroke-width="2.5"/>
        <line x1="20" y1="52" x2="180" y2="52" stroke="#FFFFFF" stroke-width="2"/>
        <line x1="20" y1="72" x2="180" y2="72" stroke="#FFFFFF" stroke-width="2"/>
        <line x1="20" y1="92" x2="130" y2="92" stroke="#FFFFFF" stroke-width="2"/>
      </g>

      <g transform="translate(240, 260)">
        <circle cx="0" cy="0" r="26" fill="#0A0E17" stroke="{c1}" stroke-width="2"/>
        <path d="M-10,26 L-26,95 L26,95 L12,26 Z" fill="#0A0E17" stroke="{c1}" stroke-width="1.8"/>
        <path d="M-26,95 L40,80 L140,55" fill="none" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="140" cy="55" r="5" fill="{c2}"/>
        <path d="M-20,95 L-24,200 M20,95 L24,200" stroke="#0A0E17" stroke-width="15" stroke-linecap="round"/>
      </g>

      <g font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700">
        <rect x="470" y="480" width="260" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="482" y="496" fill="{c1}">ZERO-CLICK EXTRACTION: 0.994</text>
      </g>
    </g>'''

    elif pillar_key == 'LLMO':
        return f'''
    <!-- Pillar 4: LLMO — Neural Architect Silhouette & Colossal Transformer Attention Lattice -->
    <g id="scene-llmo" transform="translate(0, {v_off})">
      <g transform="translate(600, 280)">
        <g transform="translate(0, -120)">
          <circle cx="-160" cy="0" r="14" fill="#0A0E1A" stroke="{c1}" stroke-width="2"/>
          <circle cx="-80" cy="0" r="14" fill="#0A0E1A" stroke="{c1}" stroke-width="2"/>
          <circle cx="0" cy="0" r="14" fill="#0A0E1A" stroke="{c1}" stroke-width="2"/>
          <circle cx="80" cy="0" r="14" fill="#0A0E1A" stroke="{c1}" stroke-width="2"/>
          <circle cx="160" cy="0" r="14" fill="#0A0E1A" stroke="{c1}" stroke-width="2"/>
          <text x="0" y="-24" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c1}">INPUT EMBEDDINGS (TOKEN LAYER)</text>
        </g>
        
        <g stroke="{c2}" stroke-width="1.2" opacity="0.45">
          <line x1="-160" y1="-106" x2="-100" y2="0"/><line x1="-160" y1="-106" x2="0" y2="0"/><line x1="-160" y1="-106" x2="100" y2="0"/>
          <line x1="-80" y1="-106" x2="-100" y2="0"/><line x1="-80" y1="-106" x2="0" y2="0"/><line x1="-80" y1="-106" x2="100" y2="0"/>
          <line x1="0" y1="-106" x2="-100" y2="0"/><line x1="0" y1="-106" x2="0" y2="0"/><line x1="0" y1="-106" x2="100" y2="0"/>
          <line x1="80" y1="-106" x2="-100" y2="0"/><line x1="80" y1="-106" x2="0" y2="0"/><line x1="80" y1="-106" x2="100" y2="0"/>
          <line x1="160" y1="-106" x2="-100" y2="0"/><line x1="160" y1="-106" x2="0" y2="0"/><line x1="160" y1="-106" x2="100" y2="0"/>
        </g>

        <g transform="translate(0, 0)">
          <circle cx="-100" cy="0" r="26" fill="#0E1428" stroke="{c1}" stroke-width="2.5"/>
          <circle cx="-100" cy="0" r="8" fill="{c1}"/>
          <circle cx="0" cy="0" r="32" fill="#0E1428" stroke="{c2}" stroke-width="3"/>
          <circle cx="0" cy="0" r="14" fill="{c2}"/>
          <circle cx="100" cy="0" r="26" fill="#0E1428" stroke="{c1}" stroke-width="2.5"/>
          <circle cx="100" cy="0" r="8" fill="{c1}"/>
          <text x="0" y="48" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c2}">MULTI-HEAD ATTENTION (Q × K^T)</text>
        </g>

        <g stroke="{c1}" stroke-width="1.5" opacity="0.6">
          <line x1="-100" y1="26" x2="-60" y2="100"/><line x1="0" y1="32" x2="0" y2="100"/><line x1="100" y1="26" x2="60" y2="100"/>
        </g>

        <g transform="translate(0, 115)">
          <rect x="-120" y="0" width="240" height="28" rx="6" fill="#0A0E1A" stroke="{c1}" stroke-width="2"/>
          <text x="0" y="18" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" text-anchor="middle" fill="{c1}">SOFTMAX PROBABILITY VECTOR</text>
        </g>
      </g>

      <g transform="translate(200, 310)">
        <circle cx="0" cy="0" r="24" fill="#070A12" stroke="{c1}" stroke-width="2"/>
        <path d="M-8,24 L-24,100 L24,100 L10,24 Z" fill="#070A12" stroke="{c1}" stroke-width="1.8"/>
        <path d="M10,45 L60,30 L110,-10" fill="none" stroke="{c1}" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="110" cy="-10" r="4" fill="{c2}"/>
        <path d="M-16,100 L-20,180 M16,100 L20,180" stroke="#070A12" stroke-width="14" stroke-linecap="round"/>
      </g>

      <g font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700">
        <rect x="800" y="440" width="180" height="24" rx="4" fill="#0A0D15" stroke="{c2}" stroke-width="1"/>
        <text x="812" y="456" fill="{c2}">ATTN_WEIGHT: 0.998</text>
      </g>
    </g>'''

    elif pillar_key == 'AAO':
        return f'''
    <!-- Pillar 5: AAO — Autonomous Cybernetic Agent Silhouette Operating WebMCP Tool Suite -->
    <g id="scene-aao" transform="translate(0, {v_off})">
      <g transform="translate(360, 240)">
        <circle cx="0" cy="0" r="28" fill="#080F16" stroke="{c1}" stroke-width="2.5"/>
        <rect x="-18" y="-4" width="36" height="8" rx="3" fill="{c1}"/>
        <path d="M-14,28 L-32,110 L32,110 L14,28 Z" fill="#080F16" stroke="{c1}" stroke-width="2"/>
        <circle cx="0" cy="65" r="14" fill="none" stroke="{c2}" stroke-width="2"/>
        <circle cx="0" cy="65" r="6" fill="{c1}"/>
        <path d="M-32,45 L-65,95 L-45,140" fill="none" stroke="{c1}" stroke-width="5" stroke-linecap="round"/>
        <path d="M32,45 L85,65 L160,85" fill="none" stroke="{c1}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="160" cy="85" r="7" fill="{c2}"/>
        <path d="M-20,110 L-26,230 M20,110 L26,230" stroke="#080F16" stroke-width="18" stroke-linecap="round"/>
      </g>

      <g transform="translate(620, 180)">
        <rect x="0" y="0" width="360" height="280" rx="10" fill="#070C12" stroke="{c1}" stroke-width="2"/>
        <line x1="0" y1="40" x2="360" y2="40" stroke="{c1}" stroke-width="1.5"/>
        <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="36" cy="20" r="5" fill="#F59E0B"/><circle cx="52" cy="20" r="5" fill="{c1}"/>
        <text x="80" y="24" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" fill="{c1}">WebMCP PROTOCOL v1.0 // TOOL RUNNER</text>
        
        <g transform="translate(20, 60)">
          <rect x="0" y="0" width="320" height="42" rx="6" fill="#0A141E" stroke="{c1}" stroke-width="1.2"/>
          <circle cx="20" cy="21" r="5" fill="{c1}"/>
          <text x="36" y="25" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="800" fill="{c1}">tool_read_machine_surface(url)</text>
          <rect x="250" y="10" width="58" height="22" rx="4" fill="{c1}"/>
          <text x="279" y="25" font-family="ui-monospace,Menlo,monospace" font-size="9" font-weight="900" text-anchor="middle" fill="#070C12">EXEC</text>
        </g>
        
        <g transform="translate(20, 115)">
          <rect x="0" y="0" width="320" height="42" rx="6" fill="#102422" stroke="{c2}" stroke-width="2"/>
          <circle cx="20" cy="21" r="5" fill="{c2}"/>
          <text x="36" y="25" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="800" fill="{c2}">tool_evaluate_agent_flow()</text>
          <rect x="250" y="10" width="58" height="22" rx="4" fill="{c2}"/>
          <text x="279" y="25" font-family="ui-monospace,Menlo,monospace" font-size="9" font-weight="900" text-anchor="middle" fill="#070C12">RUNNING</text>
        </g>

        <g transform="translate(20, 170)">
          <rect x="0" y="0" width="320" height="42" rx="6" fill="#0A141E" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <circle cx="20" cy="21" r="5" fill="rgba(255,255,255,0.4)"/>
          <text x="36" y="25" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="800" fill="rgba(255,255,255,0.7)">tool_dispatch_guest_order()</text>
          <rect x="250" y="10" width="58" height="22" rx="4" fill="rgba(255,255,255,0.1)"/>
          <text x="279" y="25" font-family="ui-monospace,Menlo,monospace" font-size="9" font-weight="900" text-anchor="middle" fill="rgba(255,255,255,0.6)">READY</text>
        </g>
        
        <text x="20" y="248" font-family="ui-monospace,Menlo,monospace" font-size="10" fill="{c1}">RETURN: 200 OK — 14 AUDIT POLICIES SATISFIED</text>
      </g>

      <line x1="520" y1="325" x2="640" y2="300" stroke="{c2}" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="640" cy="300" r="5" fill="{c2}"/>
    </g>'''

    elif pillar_key == 'RAG':
        return f'''
    <!-- Pillar 6: RAG — Vector Database Radar & High-Dimensional Document Chunk Retrieval -->
    <g id="scene-rag" transform="translate(0, {v_off})">
      <g transform="translate(200, 220)">
        <rect x="0" y="0" width="130" height="200" rx="6" fill="#0D1018" stroke="{c1}" stroke-width="1.8"/>
        <line x1="20" y1="30" x2="110" y2="30" stroke="{c1}" stroke-width="2.5"/>
        <line x1="20" y1="55" x2="110" y2="55" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="20" y1="80" x2="110" y2="80" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="20" y1="105" x2="110" y2="105" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="20" y1="130" x2="110" y2="130" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="20" y1="155" x2="80" y2="155" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="-15" y1="92" x2="145" y2="92" stroke="{c2}" stroke-width="2" stroke-dasharray="2 4"/>
        <text x="65" y="225" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c1}">RAW DOCUMENT</text>
      </g>

      <g transform="translate(640, 310)">
        <ellipse cx="0" cy="0" rx="190" ry="110" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
        <ellipse cx="0" cy="0" rx="120" ry="70" fill="none" stroke="{c1}" stroke-width="1" stroke-dasharray="4 6" opacity="0.5"/>
        <line x1="-210" y1="0" x2="210" y2="0" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <line x1="0" y1="-120" x2="0" y2="120" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        
        <g fill="rgba(255,255,255,0.2)">
          <circle cx="-130" cy="-45" r="4"/><circle cx="-145" cy="-25" r="3"/><circle cx="-110" cy="-60" r="3"/>
          <circle cx="120" cy="55" r="4"/><circle cx="140" cy="35" r="3"/><circle cx="105" cy="70" r="3"/>
        </g>

        <g>
          <circle cx="45" cy="-35" r="9" fill="{c1}"/>
          <circle cx="65" cy="-20" r="7" fill="{c2}"/>
          <circle cx="30" cy="-15" r="7" fill="{c2}"/>
          <circle cx="85" cy="-45" r="6" fill="{c1}"/>
          <line x1="45" y1="-35" x2="65" y2="-20" stroke="{c1}" stroke-width="2"/>
          <line x1="45" y1="-35" x2="30" y2="-15" stroke="{c1}" stroke-width="2"/>
          <line x1="65" y1="-20" x2="85" y2="-45" stroke="{c2}" stroke-width="2"/>
        </g>

        <polygon points="-210,0 45,-35 85,-45" fill="{c1}" fill-opacity="0.15"/>
        <line x1="-210" y1="0" x2="45" y2="-35" stroke="{c1}" stroke-width="2.5"/>
        <circle cx="-210" cy="0" r="6" fill="{c1}"/>
        <text x="65" y="-60" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="900" fill="{c1}">COSINE_SIM: 0.965</text>
      </g>

      <g transform="translate(1000, 240)">
        <circle cx="0" cy="0" r="24" fill="#0A0E17" stroke="{c1}" stroke-width="2"/>
        <path d="M-8,24 L-24,90 L24,90 L10,24 Z" fill="#0A0E17" stroke="{c1}" stroke-width="1.8"/>
        <path d="M-24,90 L-70,110 L-95,100" fill="none" stroke="{c2}" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="-95" cy="100" r="5" fill="{c2}"/>
        <path d="M-18,90 L-22,190 M18,90 L22,190" stroke="#0A0E17" stroke-width="14" stroke-linecap="round"/>
      </g>

      <g font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700">
        <rect x="420" y="470" width="220" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="432" y="486" fill="{c1}">TOP-K RECALL: 100% (CHUNK_256)</text>
      </g>
    </g>'''

    elif pillar_key == 'Sitemaps':
        return f'''
    <!-- Pillar 7: Sitemaps — Navigator Silhouette & Hierarchical XML Discovery Topography Tree -->
    <g id="scene-sitemaps" transform="translate(0, {v_off})">
      <g transform="translate(600, 200)">
        <rect x="-80" y="-30" width="160" height="38" rx="6" fill="#09131C" stroke="{c1}" stroke-width="2.5"/>
        <circle cx="-60" cy="-11" r="5" fill="{c1}"/>
        <text x="-45" y="-8" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" fill="{c1}">&lt;sitemapindex&gt;</text>
        
        <path d="M0,8 L0,50 L-240,90" fill="none" stroke="{c1}" stroke-width="2"/>
        <path d="M0,8 L0,50 L-80,90" fill="none" stroke="{c1}" stroke-width="2"/>
        <path d="M0,8 L0,50 L80,90" fill="none" stroke="{c1}" stroke-width="2"/>
        <path d="M0,8 L0,50 L240,90" fill="none" stroke="{c1}" stroke-width="2"/>
        
        <g transform="translate(-240, 90)">
          <rect x="-60" y="0" width="120" height="32" rx="5" fill="#09131C" stroke="{c2}" stroke-width="1.8"/>
          <text x="0" y="20" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c2}">/products.xml</text>
          <line x1="0" y1="32" x2="-35" y2="80" stroke="{c2}" stroke-width="1.2"/>
          <line x1="0" y1="32" x2="35" y2="80" stroke="{c2}" stroke-width="1.2"/>
          <circle cx="-35" cy="80" r="5" fill="{c1}"/><circle cx="35" cy="80" r="5" fill="{c1}"/>
        </g>
        <g transform="translate(-80, 90)">
          <rect x="-55" y="0" width="110" height="32" rx="5" fill="#09131C" stroke="{c1}" stroke-width="1.8"/>
          <text x="0" y="20" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c1}">/guides.xml</text>
          <line x1="0" y1="32" x2="0" y2="80" stroke="{c1}" stroke-width="1.2"/>
          <circle cx="0" cy="80" r="5" fill="{c2}"/>
        </g>
        <g transform="translate(80, 90)">
          <rect x="-55" y="0" width="110" height="32" rx="5" fill="#09131C" stroke="{c1}" stroke-width="1.8"/>
          <text x="0" y="20" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c1}">/news.xml</text>
          <line x1="0" y1="32" x2="0" y2="80" stroke="{c1}" stroke-width="1.2"/>
          <circle cx="0" cy="80" r="5" fill="{c2}"/>
        </g>
        <g transform="translate(240, 90)">
          <rect x="-60" y="0" width="120" height="32" rx="5" fill="#09131C" stroke="{c2}" stroke-width="1.8"/>
          <text x="0" y="20" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c2}">/llms-txt.xml</text>
          <line x1="0" y1="32" x2="-35" y2="80" stroke="{c2}" stroke-width="1.2"/>
          <line x1="0" y1="32" x2="35" y2="80" stroke="{c2}" stroke-width="1.2"/>
          <circle cx="-35" cy="80" r="5" fill="{c1}"/><circle cx="35" cy="80" r="5" fill="{c1}"/>
        </g>
      </g>

      <g transform="translate(180, 260)">
        <circle cx="0" cy="0" r="25" fill="#0A0E17" stroke="{c1}" stroke-width="2"/>
        <path d="M-8,25 L-24,95 L24,95 L10,25 Z" fill="#0A0E17" stroke="{c1}" stroke-width="1.8"/>
        <line x1="30" y1="180" x2="30" y2="-40" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="30" cy="-40" r="6" fill="{c2}"/>
        <path d="M10,60 L30,45" fill="none" stroke="{c1}" stroke-width="4" stroke-linecap="round"/>
        <path d="M-18,95 L-22,190 M18,95 L22,190" stroke="#0A0E17" stroke-width="14" stroke-linecap="round"/>
      </g>

      <g font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700">
        <rect x="460" y="470" width="280" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="472" y="486" fill="{c1}">DISCOVERY_INDEX: 100% CRAWL_REACH</text>
      </g>
    </g>'''

    elif pillar_key == 'schema.org':
        return f'''
    <!-- Pillar 8: schema.org — Knowledge Engineer Silhouette & Linked-Data RDF Entity Graph -->
    <g id="scene-schema" transform="translate(0, {v_off})">
      <g transform="translate(600, 310)">
        <rect x="-70" y="-35" width="140" height="70" rx="8" fill="#0A130E" stroke="{c1}" stroke-width="2.5"/>
        <circle cx="-45" cy="0" r="8" fill="{c1}"/>
        <text x="-25" y="-5" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="900" fill="{c1}">@type:</text>
        <text x="-25" y="12" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" fill="#FFFFFF">Organization</text>
        
        <g transform="translate(180, -110)">
          <rect x="-60" y="-25" width="120" height="50" rx="6" fill="#0A130E" stroke="{c2}" stroke-width="2"/>
          <text x="0" y="5" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c2}">Product</text>
          <line x1="-80" y1="35" x2="-20" y2="10" stroke="{c2}" stroke-width="1.8"/>
          <text x="-70" y="12" font-family="ui-monospace,Menlo,monospace" font-size="9" fill="{c1}">hasOffer</text>
        </g>

        <g transform="translate(-180, -110)">
          <rect x="-55" y="-25" width="110" height="50" rx="6" fill="#0A130E" stroke="{c2}" stroke-width="2"/>
          <text x="0" y="5" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c2}">Person</text>
          <line x1="65" y1="35" x2="15" y2="10" stroke="{c2}" stroke-width="1.8"/>
          <text x="25" y="12" font-family="ui-monospace,Menlo,monospace" font-size="9" fill="{c1}">founder</text>
        </g>

        <g transform="translate(0, 130)">
          <rect x="-65" y="-25" width="130" height="50" rx="6" fill="#0A130E" stroke="{c1}" stroke-width="2"/>
          <text x="0" y="5" font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="800" text-anchor="middle" fill="{c1}">WebSite</text>
          <line x1="0" y1="-55" x2="0" y2="-25" stroke="{c1}" stroke-width="2"/>
          <text x="12" y="-38" font-family="ui-monospace,Menlo,monospace" font-size="9" fill="{c2}">mainEntity</text>
        </g>
      </g>

      <g transform="translate(940, 250)">
        <circle cx="0" cy="0" r="25" fill="#080E0B" stroke="{c1}" stroke-width="2"/>
        <path d="M-8,25 L-24,95 L24,95 L10,25 Z" fill="#080E0B" stroke="{c1}" stroke-width="1.8"/>
        <path d="M-24,95 L-70,80 L-130,70" fill="none" stroke="{c1}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="-130" cy="70" r="6" fill="{c2}"/>
        <path d="M-18,95 L-22,190 M18,95 L22,190" stroke="#080E0B" stroke-width="14" stroke-linecap="round"/>
      </g>

      <g font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700">
        <rect x="180" y="440" width="220" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="192" y="456" fill="{c1}">JSON-LD @GRAPH: VALIDATED</text>
      </g>
    </g>'''

    else:
        return f'''
    <!-- Pillar 9: E-E-A-T — Auditor Silhouette & Cryptographic Shield of Provenance & Trust -->
    <g id="scene-eeat" transform="translate(0, {v_off})">
      <g transform="translate(600, 310)">
        <path d="M-120,-110 L120,-110 Q140,50 0,160 Q-140,50 -120,-110 Z" fill="#0B0D14" stroke="{c1}" stroke-width="3"/>
        <path d="M-95,-90 L95,-90 Q110,40 0,135 Q-110,40 -95,-90 Z" fill="none" stroke="{c2}" stroke-width="1.5" stroke-dasharray="4 6"/>
        
        <circle cx="-35" cy="-35" r="28" fill="none" stroke="{c1}" stroke-width="2"/>
        <circle cx="35" cy="-35" r="28" fill="none" stroke="{c1}" stroke-width="2"/>
        <circle cx="-35" cy="25" r="28" fill="none" stroke="{c2}" stroke-width="2"/>
        <circle cx="35" cy="25" r="28" fill="none" stroke="{c2}" stroke-width="2"/>
        <text x="-35" y="-31" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" text-anchor="middle" fill="{c1}">E</text>
        <text x="35" y="-31" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" text-anchor="middle" fill="{c1}">E</text>
        <text x="-35" y="29" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" text-anchor="middle" fill="{c2}">A</text>
        <text x="35" y="29" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" text-anchor="middle" fill="{c2}">T</text>
        
        <g transform="translate(0, -5)">
          <circle cx="0" cy="0" r="14" fill="#0A0C12" stroke="{c1}" stroke-width="2"/>
          <path d="M-5,-4 L-5,-10 Q0,-15 5,-10 L5,-4" fill="none" stroke="{c1}" stroke-width="2"/>
          <circle cx="0" cy="0" r="3" fill="{c1}"/>
        </g>
      </g>

      <g transform="translate(260, 240)">
        <circle cx="0" cy="0" r="26" fill="#0A0D14" stroke="{c1}" stroke-width="2"/>
        <path d="M-10,26 L-30,105 L30,105 L12,26 Z" fill="#0A0D14" stroke="{c1}" stroke-width="1.8"/>
        <path d="M-12,70 L45,85 L85,75" fill="none" stroke="{c1}" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="85" y="55" width="40" height="35" rx="4" fill="#07090F" stroke="{c2}" stroke-width="1.5"/>
        <line x1="92" y1="68" x2="118" y2="68" stroke="{c1}" stroke-width="2"/>
        <line x1="92" y1="78" x2="110" y2="78" stroke="{c2}" stroke-width="2"/>
        <path d="M-18,105 L-22,210 M18,105 L22,210" stroke="#0A0D14" stroke-width="15" stroke-linecap="round"/>
      </g>

      <g font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700">
        <rect x="760" y="240" width="180" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="772" y="256" fill="{c1}">RFC_3161 TIMESTAMP: OK</text>
        <rect x="760" y="280" width="180" height="24" rx="4" fill="#0A0D15" stroke="{c2}" stroke-width="1"/>
        <text x="772" y="296" fill="{c2}">C2PA PROVENANCE: HASHED</text>
        <rect x="470" y="490" width="260" height="24" rx="4" fill="#0A0D15" stroke="{c1}" stroke-width="1"/>
        <text x="482" y="506" fill="{c1}">E-E-A-T AUTHORITATIVENESS: 100%</text>
      </g>
    </g>'''


def generate_news_cover_svg(item, slug):
    topic = esc(item.get('topic', 'LLMO').replace('_', ' '))
    date = esc(item.get('updatedAt') or item.get('publishedAt', '2026-09-06'))
    title = esc(item.get('title', {}).get('en', 'AI Search Visibility'))
    
    seed = int(hashlib.sha256(item['id'].encode()).hexdigest()[:8], 16)
    pillar_key, pillar_desc, c1, c2, c3, glow = get_pillar_meta(item.get('topic', ''))
    
    art = render_silhouette_art(pillar_key, c1, c2, c3, seed)
    
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-labelledby="t-{slug} d-{slug}">
  <title id="t-{slug}">HTML&amp;HTML AI Search Intelligence — {pillar_key} ({topic})</title>
  <desc id="d-{slug}">Vector silhouette blueprint and narrative story for {title}</desc>
  <defs>
    <linearGradient id="bg-{slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060709"/>
      <stop offset="50%" stop-color="#090B10"/>
      <stop offset="100%" stop-color="#0C0F16"/>
    </linearGradient>
    <radialGradient id="glow-{slug}" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="{c1}" stop-opacity="0.28"/>
      <stop offset="60%" stop-color="{c2}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#060709" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="radial-geo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{c1}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="{c2}" stop-opacity="0.2"/>
    </radialGradient>
    <linearGradient id="beam-seo" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{c1}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="{c1}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="675" fill="url(#bg-{slug})"/>
  <rect width="1200" height="675" fill="url(#glow-{slug})"/>

  <!-- Perspective Floor Grid (Cybernetic Horizon) -->
  <g stroke="rgba(255,255,255,0.035)" stroke-width="1">
    <line x1="0" y1="520" x2="1200" y2="520"/>
    <line x1="0" y1="560" x2="1200" y2="560"/>
    <line x1="0" y1="610" x2="1200" y2="610"/>
    <line x1="600" y1="480" x2="100" y2="675"/>
    <line x1="600" y1="480" x2="350" y2="675"/>
    <line x1="600" y1="480" x2="600" y2="675"/>
    <line x1="600" y1="480" x2="850" y2="675"/>
    <line x1="600" y1="480" x2="1100" y2="675"/>
  </g>

  <!-- Isometric Blueprint Grid Lines (Subtle) -->
  <line x1="0" y1="337.5" x2="1200" y2="337.5" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="4 8"/>
  <line x1="600" y1="0" x2="600" y2="675" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="4 8"/>

  <!-- SPECIFIC PILLAR SILHOUETTE SCENE -->
{art}

  <!-- Outer Technical Blueprint HUD Brackets -->
  <path d="M40 60 V40 H60 M1140 40 H1160 V60 M1160 615 V635 H1140 M60 635 H40 V615" stroke="rgba(255,255,255,0.22)" stroke-width="1.8" fill="none"/>

  <!-- Top Metadata Ribbon -->
  <rect x="48" y="48" width="130" height="24" rx="4" fill="{c1}" fill-opacity="0.15" stroke="{c1}" stroke-width="1.2"/>
  <text x="113" y="64" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="900" text-anchor="middle" fill="{c1}">PILLAR // {pillar_key}</text>
  <text x="190" y="64" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="rgba(255,255,255,0.65)">[ {pillar_desc} ]</text>
  <text x="1152" y="64" font-family="ui-monospace,Menlo,monospace" font-size="11" text-anchor="end" letter-spacing="1.5" fill="rgba(255,255,255,0.4)">ID-{hex(seed)[2:10].upper()}</text>

  <!-- Bottom Caption & Context -->
  <rect x="48" y="585" width="1104" height="42" rx="6" fill="#07090E" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="64" y="611" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">{title[:72]}</text>
  <text x="1136" y="611" font-family="ui-monospace,Menlo,monospace" font-size="10.5" font-weight="700" text-anchor="end" letter-spacing="2" fill="{c1}">HTML&amp;HTML // {date}</text>
</svg>'''
    return svg
