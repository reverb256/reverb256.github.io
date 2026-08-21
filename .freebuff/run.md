# Reverb256 Portfolio — Preview Run Doc

## How to reproduce uncommitted artifacts

No env files or secrets needed. The workspace IS the main checkout.

1. **Dependencies** — already installed in `astro-portfolio/node_modules/`. If missing:
   ```bash
   cd astro-portfolio && bun install
   ```

2. **Build the static site**:
   ```bash
   cd astro-portfolio && bun run build
   ```
   This outputs to `astro-portfolio/dist/`.

## How to run the server

Use the Node.js static server (most reliable for the preview harness):

```bash
PORT=4330 node astro-portfolio/preview-server.mjs &
```

- **Port:** 4330 (check `lsof` to verify it's free first — 4321 is often taken by other projects)
- **Type:** Node.js HTTP static file server with SPA fallback
- **Why Node over Python:** Python `http.server` dies when the preview harness tries to attach. The Node server persists.

### Alternative: Python server (less reliable)

```bash
cd astro-portfolio/dist && python3 -m http.server <FREE_PORT> --bind 0.0.0.0 &
```

### Alternative: Astro dev server

```bash
cd astro-portfolio && nohup node --max-old-space-size=8192 ./node_modules/astro/bin/astro.mjs dev --port <FREE_PORT> --host 0.0.0.0 > .freebuff/preview.log 2>&1 &
```

## Preview registration

```python
register_preview(url="http://localhost:<PORT>/", pid=<server_pid>, replace=True)
```
