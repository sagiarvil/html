import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const P499 = String.fromCharCode(36) + "499";
const P99 = String.fromCharCode(36) + "99";
const P0 = String.fromCharCode(36) + "0";

test("Paddle commercial surface: pure 2-tier model (" + P0 + " and " + P99 + ") with zero " + P499 + " offers", () => {
  const surfaces = [
    "index.html",
    "tr/index.html",
    "en/index.html",
    "checkout.html",
    "tr/fiyatlandirma/index.html",
    "en/pricing/index.html",
    "tr/fix-mandate/index.html",
    "en/fix-mandate/index.html",
    "tr/kullanim-kosullari/index.html",
    "en/terms/index.html",
    "tr/iade-politikasi/index.html",
    "en/refund-policy/index.html",
    "tr/teslimat-politikasi/index.html",
    "en/delivery-policy/index.html",
    "tr/iletisim/index.html",
    "en/contact/index.html",
    "tr/sss/index.html",
    "tr/enterprise-dark-pool/index.html",
    "en/enterprise-dark-pool/index.html"
  ];

  for (const rel of surfaces) {
    const p = resolve(ROOT, rel);
    assert.ok(existsSync(p), "Surface must exist: " + rel);
    const text = readFileSync(p, "utf-8");

    // Assert no $499 offer or pricing
    assert.ok(!text.includes(P499), "Surface " + rel + " must not contain " + P499);
    assert.ok(!text.includes("499 USD"), "Surface " + rel + " must not contain 499 USD");
    assert.ok(!text.includes('"price": "499"'), "Surface " + rel + " must not contain 499 in schema");
    assert.ok(!text.includes("plan=enterprise"), "Surface " + rel + " must not link to plan=enterprise");

    // Prohibited categories from Paddle AUP must not be offered as our service
    assert.ok(!text.toLowerCase().includes("marketing agency"), "Surface " + rel + " must not claim marketing agency");
    assert.ok(!text.toLowerCase().includes("consulting service"), "Surface " + rel + " must not claim consulting service");
    assert.ok(!text.toLowerCase().includes("bespoke software development"), "Surface " + rel + " must not claim custom development");
  }
});

test("Checkout surface: single " + P99 + " product displaying 22 delivery files", () => {
  const checkout = readFileSync(resolve(ROOT, "checkout.html"), "utf-8");
  assert.ok(checkout.includes(P99), "Checkout must offer " + P99);
  assert.ok(!checkout.includes(P499), "Checkout must not contain " + P499);
  assert.ok(!checkout.includes("plan-toggle"), "Checkout must not contain plan-toggle");
  assert.ok(checkout.includes("22 Dosya") || checkout.includes("22 Files"), "Checkout must highlight 22 files");
  assert.ok(checkout.includes("00_READ_ME.md"), "Checkout must list 00_READ_ME.md");
  assert.ok(checkout.includes("21_HALLUCINATION_TEST.py"), "Checkout must list 21_HALLUCINATION_TEST.py");
});

test("Sample report pages: public proof of deterministic software output", () => {
  const trSample = resolve(ROOT, "tr/ornek-rapor/index.html");
  const enSample = resolve(ROOT, "en/sample-report/index.html");
  assert.ok(existsSync(trSample), "tr/ornek-rapor/index.html must exist");
  assert.ok(existsSync(enSample), "en/sample-report/index.html must exist");

  const trContent = readFileSync(trSample, "utf-8");
  const enContent = readFileSync(enSample, "utf-8");

  assert.ok(trContent.includes("Deterministik"), "TR sample report must declare deterministic output");
  assert.ok(enContent.includes("deterministic"), "EN sample report must declare deterministic output");
  assert.ok(trContent.includes("SUNMAZ"), "TR sample report must have negative disclaimer");
  assert.ok(enContent.includes("DOES NOT provide"), "EN sample report must have negative disclaimer");
});
