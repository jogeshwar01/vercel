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

### Setup

1. Clone the repository on your local machine -

```
git clone https://github.com/jogeshwar01/vercel.git
```

2. Setup AWS account and create a user with access to S3, ECS, ECR

3. Create a new repository in ECR and use the `push commands` to push local build docker image to ECR. Setup a Task and a Cluster for this image in ECS.

4. Setup a Redis Instance. (public url preferred - to be used in aws). Can use aiven.io for a free instance.
   Check detailed setup guide for AWS here - https://github.com/jogeshwar01/vercel-base

5. Set environment variables according to .env.example in the following apps -

```
apps/web
apps/api
apps/api-build    - set the env variables in AWS ECR
```

6. Start the docker containers locally - 
```
docker compose up -d
```

7. Ports - `Local:Docker`
- 5000:9000 - S3 Reverse Proxy
- 5001:9001 - API Server
- 5002:9002 - Socket Log Server
- 5003:5173 - React app

#### Demo -

##### Home Page -

![image](https://github.com/jogeshwar01/vercel/assets/85165953/2b25366b-7695-4932-9afa-f7a2b784a002)

##### Enter Github Repository URL and slug -

![image](https://github.com/jogeshwar01/vercel/assets/85165953/9bb0f2b1-f2ea-4718-8c5c-4a0c10dba4e9)

##### Deployment Initiated -

![image](https://github.com/jogeshwar01/vercel/assets/85165953/1a958833-c8b9-4377-8f25-f3064ec10479)

#### Streaming Logs from ECS -

![image](https://github.com/jogeshwar01/vercel/assets/85165953/4737390a-4b9c-49e6-b08e-bded1411e98a)

##### Deployed Test React App -

![image](https://github.com/jogeshwar01/vercel/assets/85165953/165197a2-5216-4e92-a198-d9e355647905)

#### Important

- To ensure external accessibility, it is crucial to ensure that the Vite server is correctly bound to 0.0.0.0 rather than localhost or 127.0.0.1 within the container. This binding ensures that the server listens on all network interfaces, facilitating access from outside the container, including from the host machine. Adjustment to the Vite configuration to explicitly set the host to 0.0.0.0 can be accomplished by modifying the vite.config.ts file or by appending the --host flag to the vite. Command - `vite --host`

#### To setup new node app

1. Run `yarn init` and `tsc --init`
2. Add internal package to dependencies like `"common": "*"`
3. Change `rootDir` to `./src` and `outDir` to `./dist`
4. Update `moduleResolution` and `module` in `tsconfig.json` to `nodenext` and `NodeNext` respectively - need to update code to use `typescript-config` in all apps/packages
