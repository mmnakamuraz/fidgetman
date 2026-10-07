# Fidgetman

Small tools for quick dev tasks, always at hand: a collection of common utilities for text, encoding, compression, cryptography, data generation, and others. Quick, portable and super fast: the tools run on your device; the app does not send tool input to a cloud service or store it in cloud storage.

## Platforms

- **Web:** Runs in a modern browser and can be hosted as a static site.
- **Desktop:** Runs as an Electron app for macOS, Windows, and Linux. The build configuration targets macOS, Windows NSIS installers, and Linux AppImages.

Some tools use browser APIs such as the clipboard and may require permission. Tool-specific temporary state is not necessarily persisted; for example, the clipboard tool's slots are session-only.

## Local development

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

Useful commands:

```sh
npm run build      # Type-check and build the web app into dist/
npm run preview    # Preview the production web build locally
npm test           # Run unit tests
npm run electron:dev   # Run the desktop app with the Vite development server
```

## Web deployment (GitHub Pages)

The workflow at `.github/workflows/deploy.yml` deploys the contents of `dist/` to GitHub Pages when code is pushed to `master`. It can also be started manually from the repository's **Actions** tab with **Run workflow**.

To enable it, open the repository's **Settings → Pages** and set the deployment source to **GitHub Actions**. The workflow installs dependencies with `npm ci`, builds with `npm run build`, uploads `dist/`, and deploys that artifact. Vite is configured with a relative asset base (`base: './'`) to support Pages hosting under a repository path.

## Desktop build

Build the Electron app for the current host platform with:

```sh
npm run electron:build
```

This runs the web build first, then invokes `electron-builder`. Generated distributables are written to `release/`. The configured targets are macOS, Windows NSIS, and Linux AppImage; cross-platform builds may require platform-specific tooling or CI runners.

## Tool architecture and discovery

Tools live under `src/tools/`, grouped into section directories. A typical structure looks like this:

```text
src/tools/<section>/
  manifest.ts                 # Section metadata
  <tool>/
    manifest.ts               # Tool metadata
    core.ts                   # Tool logic (when applicable)
    core.test.ts              # Core logic tests (when applicable)
    ui/
      View.tsx                # Tool screen
      View.css                # Screen styles
    workers/                  # Optional Web Workers
```

Section and tool metadata are typed in `src/tools/manifest.types.ts`. The registry in `src/tools/registry.tsx` uses Vite's `import.meta.glob` at build time to discover section manifests (`./*/manifest.ts`), tool manifests (`./*/*/manifest.ts`), and tool views (`./*/*/ui/View.tsx`). It associates each tool with its parent section, checks for duplicate IDs and missing section/view/manifest counterparts, then sorts sections and tools using their declared `order` values. Tool views are lazy-loaded, so only the selected tool's view needs to load when it is opened.

To add a tool, create its tool manifest and `ui/View.tsx` under an existing section directory. Add a section-level `manifest.ts` when creating a new section. The registry discovers matching files automatically—there is no separate central list to update. Put reusable tool logic in `core.ts` and cover that logic with tests; UI components themselves are not unit-tested in this project.
