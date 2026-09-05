# Standards Update Policy

1. Scheduled watcher detects an upstream official-source change or an unverifiable marker.
2. Production scoring remains unchanged.
3. Review the authoritative source and classify the change as standard, vendor policy, proposal, heuristic or experimental.
4. Update `standards-registry.json` and/or `llms-rules-v2.json` with a new version and verification timestamp.
5. Add or update regression fixtures.
6. Pass quality CI and production smoke after deployment.
7. Only then is the new rule active in production.

No autonomous upstream fetch may silently change scoring weights or create new blocking rules.
