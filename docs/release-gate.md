# Final Release Gate

A release is FINAL only if all three conditions hold:

1. The production symptom is gone.
2. The root cause is confirmed by an acceptance/falsification test.
3. The same failure mode can recur without breaking the system.

Build success alone is insufficient. `live-smoke.yml` must pass against `https://htmlandhtml.com` after Firebase Hosting + Functions deployment.
