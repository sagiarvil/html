# Status Vocabulary

- `BUILD`: code and CI support the intended behavior.
- `DEPLOYED`: provider accepted the release.
- `LIVE`: production domain returns the intended release markers and runtime contract.
- `FINAL`: LIVE plus root-cause and recurrence release gates pass.

Do not use LIVE or FINAL for a commit that has not passed external production smoke tests.
