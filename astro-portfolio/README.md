# Astro Starter Kit: Minimal

```sh
bun create astro@latest my-new-site --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install --frozen-lockfile` | Installs dependencies from `bun.lock`                      |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |
| `bunx playwright test`    | Run the Playwright tests (Chromium projects)     |

> `flake.nix` here is the Nix devShell (`nix develop`). Its Playwright browsers
> come from nixpkgs, so `@playwright/test` in `package.json` is pinned to the
> exact `playwright-driver` version of the flake's nixpkgs; the flake fails to
> evaluate if the two drift. See the "Nix dev shells" section of the root
> `README.md`.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
