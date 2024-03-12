# Vercel

A monorepo for vercel-like frontend deployment application

## Structure

This Turborepo includes the following packages/apps:

### Apps and Packages

- `apps/api`: an [Express/Node](https://expressjs.com/) backend to spin aws ecs containers and other core logic
- `apps/api-proxy`: an [Express/Node](https://expressjs.com/) backend reverse proxy to map to s3 url
- `apps/api-build`: - setup docker image, build project and upload to S3
- `apps/web`: a [React.js](https://react.dev/) frontend
- `packages/common`: package for sharing code used in multiple apps
- `packages/ui`: a stub React component library used in `web`
- `packages/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

#### Setup new node app

1. Run `yarn init` and `tsc --init`
2. Add internal package to dependencies like `"common": "*"`
3. Change `rootDir` to `./src` and `outDir` to `./dist`
4. Update `moduleResolution` and `module` in `tsconfig.json` to `nodenext` and `NodeNext` respectively - need to update code to use `typescript-config` in all apps/packages

#### Learnings

- To ensure external accessibility, it is crucial to ensure that the Vite server is correctly bound to 0.0.0.0 rather than localhost or 127.0.0.1 within the container. This binding ensures that the server listens on all network interfaces, facilitating access from outside the container, including from the host machine. Adjustment to the Vite configuration to explicitly set the host to 0.0.0.0 can be accomplished by modifying the vite.config.ts file or by appending the --host flag to the vite. Command - `vite --host`
