# Operator note — AI positioning build order

Production copy is materialized in this order:

1. `scripts/build_ai_visibility_authority.py`
2. `scripts/inject_commercial_intent.py`
3. `scripts/apply_customer_positioning.py`

Do not reverse the order. The final customer-positioning pass owns H1/lead/CTA wording on commercial, tool, and guide routes. Authority/glossary source classification and engine/scoring contracts remain upstream and unchanged.
