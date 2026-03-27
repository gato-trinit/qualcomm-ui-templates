# QUI React Tauri Template

This template can be used to kickstart your desktop application development.

- React
- Tauri v2
- QUI React
- Vite
- React Router
- Turborepo
- ESLint, Prettier, and Stylelint

## Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [Rust](https://www.rust-lang.org/tools/install)
- Install [Tauri prerequisites](https://tauri.app/start/prerequisites/)
- Use [Corepack](https://pnpm.io/installation#using-corepack) to enable pnpm installation
  - `corepack enable`

## Install Dependencies

```shell
pnpm install
```

## Develop

First time (after fresh clone):

```shell
pnpm build
```

Start the full Tauri application:

```shell
pnpm dev:tauri
```

Start only the React UI in the browser (no Tauri):

```shell
pnpm dev:ui
```

## Bundling

```shell
pnpm bundle
```

Builds for Linux x64, MacOS, and Windows x64.
