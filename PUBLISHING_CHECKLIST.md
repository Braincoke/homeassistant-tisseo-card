# Publishing Checklist (Cards)

Use this checklist before publishing the card project.

## 1) Privacy and Secrets

- [ ] Confirm no private tokens/keys in source or docs.
- [ ] Confirm no personal identifiers in examples (use generic entities).
- [ ] Confirm `.gitignore` excludes local files (`._*`, `.DS_Store`, logs).

Quick scans:

```bash
rg -n -S "api_key\\s*[:=]|Bearer\\s+|token\\s*[:=]|password\\s*[:=]" .
rg -n -S "/Users/|/Volumes/homeassistant/config|@gmail\\.com|@icloud\\.com" .
```

## 2) Functional Checks

- [ ] Card loads from `/local/community/tisseo-departures-card/tisseo-departures-card.js`.
- [ ] Visual editor works for all card types.
- [ ] Manual refresh button action works against the backend integration.
- [ ] Light/dark themes render correctly.

## 3) Documentation and HACS

- [ ] README examples use generic entity IDs.
- [ ] `hacs.json` filename matches distributed JS file.
- [ ] `info.md` is concise and aligned with README features.

## 4) Release

- [ ] Bump version marker if you track one.
- [ ] Tag release `vX.Y.Z`.
- [ ] Add release notes (breaking changes, migration notes).
