# Vercel

A monorepo for vercel-like frontend deployment application

## Structure

This Turborepo includes the following packages/apps:

### Apps and Packages

-   `apps/api-build`: - setup docker image, build project and upload to S3
-   `apps/web`: a [React.js](https://react.dev/) frontend
-   `packages/common`: package for sharing code used in multiple apps
-   `packages/ui`: a stub React component library used in `web`
-   `packages/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `packages/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Utilities

This Turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting

#### Setup new node app

1. Run `yarn init` and `tsc --init`
2. Add internal package to dependencies like `"common": "*"`
3. Change `rootDir` to `./src` and `outDir` to `./dist`
4. Update `moduleResolution` and `module` in `tsconfig.json` to `nodenext` and `NodeNext` respectively - need to update code to use `typescript-config` in all apps/packages
