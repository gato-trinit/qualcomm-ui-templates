# QUI React Electron w/ C++

This template can be used to kickstart your desktop application development.

- [React](https://react.dev/)
- [Electron](https://www.electronjs.org/) v28+
- [QUI React](https://react-next.qui.qualcomm.com/)
- [ESBuild](https://esbuild.github.io/) for bundling
- [Vite](https://vitejs.dev/)
- [React Router](https://tanstack.com/router/latest/docs/framework/react/overview) framework mode, file-based routing
- [Playwright](https://playwright.dev) for e2e testing of the Electron application.
- ESLint, Prettier, and Stylelint for code formatting

The React frontend is organized using [Feature-Sliced Design](https://react.qui.qualcomm.com/patterns/project-structure).

## Install Dependencies

- Install Node.js
- Once Node is installed, run `corepack enable`

## Install NPM Dependencies

In the repository root folder:

- run `pnpm i` to install dependencies.

If you run into certificate issues during installation, check out our [Troubleshooting](https://react.qui.qualcomm.com/troubleshooting) guide to resolve them.

## Develop

If it's your first time starting the application (i.e. after a fresh clone), make sure you run:

```shell
pnpm build
```

Start the site:

```shell
pnpm dev
```

## Bundling

The `pnpm bundle` script will attempt to build the Electron application for the following output targets:

- Linux x64
- MacOS
- Windows x64

It's worth noting that binaries built for Windows need to be built on a Windows device.
