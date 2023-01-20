# Lazerpay Checkout

Your Multichain Crypto payment gateway. Lazerpay Checkout is a payment gateway library that makes it easy for users to make payments in crypto either through transfers, wallet connect or centralized exchanges

## Development

## Workspace setup

Install dependencies from the repository's root directory (this will also set up each workspace):

```bash
yarn
```

## .env.local file setup

Some examples have `.env.local.example` files. Copy their content and create new `.env.local` files in the same directory.
Without these `yarn:build` command will fail. To get your API Key head to [dashboard.lazerpay.finance](https://dashboard.lazerpay.finance/)

## Commands

- `yarn build` - Build all packages.
- `yarn dev` - Build and watch all packages for changes.
- `yarn dev:html` - Run plain html/js example (has to be ran together with `yarn dev` in a separate terminal tab).
- `yarn build` - Build all packages + examples.
- `yarn lint` - Run the linter.
- `yarn prettier` - Run prettier.
- `yarn typecheck` - Run typescript checks.

## Repository structure

- `chains` - Helper packages for managed chain workflows
- `examples` - Contains examples for all suported use cases, acts as testing ground
- `packages`
  - `core` - State and Config
  - `ui` - Web-components based ui of Lazerpay Checkout
    - `components` - Basic ui components
    - `views` - Full Lazerpay views
  - `html` - Vanilla html / js wrapper on top of core and ui
