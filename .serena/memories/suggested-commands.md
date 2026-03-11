# Suggested Commands

## Development

All commands run from `astro-portfolio/` directory.

```bash
# Start dev server at localhost:4321
bun run dev

# Build to astro-portfolio/dist/
bun run build

# Preview production build locally (required for tests)
bun run preview

# Run all Playwright tests
bun run test

# Run tests with Playwright UI
bun run test:ui

# Run browser-specific tests
bun run test:firefox   # Firefox only
bun run test:chromium  # Chromium only
bun run test:webkit    # WebKit only
```

## Package Manager

This project uses **Bun** instead of npm:
```bash
bun install           # Install dependencies
bun add <package>     # Add dependency
bun run <script>      # Run npm script
```

## Git Commands

Standard git workflow:
```bash
git status            # Check working tree status
git add <files>       # Stage files
git commit            # Create commit
git push              # Push to remote
```

## System Utilities (Linux/NixOS)

```bash
ls                    # List files
cd <dir>              # Change directory
grep <pattern>        # Search file content
find . -name "*.ts"   # Find files by pattern
```

## Testing Workflow

1. Make changes to code
2. Run `bun run build` to build
3. Run `bun run preview` to serve production build
4. Run `bun run test` to verify
5. Use `bun run test:ui` for interactive debugging

## Important Notes

- **Bun is required** - not npm (faster, compatible)
- **Playwright 1.57.0** - pinned for NixOS browser compatibility
- **Tests require preview mode** - not dev server
- **Port 4321** - dev/preview server default
