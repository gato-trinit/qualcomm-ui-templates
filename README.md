# Qualcomm UI Templates

This is a supporting repository for the Qualcomm UI (QUI) component library.

- [React documentation](https://react-next.qui.qualcomm.com/)
- [Angular documentation](https://angular-next.qui.qualcomm.com/)

## Cloning a template

The only prerequisite is [Node.js](https://nodejs.org/en).

- Templates are located in the `templates` directory.
- Each template is a self-contained directory with QUI pre-installed and configured.

Instructions:

- Pick a template from the `templates` directory and run the following command:

```shell
pnpx tiged https://github.com/qualcomm/qualcomm-ui-templates/templates/<TEMPLATE_FOLDER> <PROJECT_NAME>
```

Install dependencies using your preferred package manager, then you're ready to go.

### Example

The following example creates a new React Router SSR project named `my-project`:

```shell
pnpx tiged https://github.com/qualcomm/qualcomm-ui-templates/templates/react-router-ssr my-project
```

## Development

Local development is only necessary if you plan to update templates.

### Branches

**main**: Primary development branch. Contributors should develop submissions based on this branch, and submit pull requests to this branch.

### Requirements

- [Node.js](https://nodejs.org/en) `^20.19.0 || ^22.12.0 || ^24.0.0`
- [pnpm](https://pnpm.io/installation#using-corepack)
  - Do not install pnpm globally. Use [Corepack](https://pnpm.io/installation#using-corepack)
  - Use corepack to install the version in the root `package.json` `packageManager` field:
    - `corepack enable pnpm` (you only need to do this once for the version of node that you're using)

### Installation Instructions

```shell
pnpm i
```

## Getting in Contact

- [Report an Issue on GitHub](../../issues)
- [Open a Discussion on GitHub](../../discussions)

## License

_QUI_ is licensed under the [BSD-3-Clause-Clear License](https://spdx.org/licenses/BSD-3-Clause-Clear.html). See [LICENSE.txt](LICENSE.txt) for the full license text.
