# Project: test-table

Welcome to the `test-table` project! This project is set up with a modern development stack including React, TypeScript, Material UI, Vite, Jest, and Storybook. Below you will find the necessary instructions to get started, run the development environment, execute tests, and build the project.

## Getting Started

First, clone the repository to your local machine and install the dependencies.

```bash
git clone git@github.com:MaxAlieksieiev/table.git
cd test-table
yarn install
```

To create a README.md file with the given project description, you'll need to follow these steps. Since I can't create files directly, I'll provide the markdown content, and you can copy and paste it into your own README.md file in your project directory.

markdown
Copy code

# Project: test-table

Welcome to the `test-table` project! This project is set up with a modern development stack including React, TypeScript, Material UI, Vite, Jest, and Storybook. Below you will find the necessary instructions to get started, run the development environment, execute tests, and build the project.

## Getting Started

First, clone the repository to your local machine and install the dependencies.

```bash
git clone <repository-url>
cd test-table
yarn install
Available Scripts
In the project directory, you can run several scripts:
```

`yarn dev` - Runs the app in development mode using Vite.
Open `http://localhost:5173` to view it in your browser. The page will reload when you make changes.

`yarn build` - Compiles the TypeScript files and builds the app for production using Vite. It optimizes the build for the best performance.
The build artifacts will be stored in the `dist/`directory.

`yarn preview` - Runs a local server to preview the production build. This is useful for checking the production build locally before deployment.

`yarn test:cov` - Launches the test runner in interactive watch mode and generates a coverage report. It helps you understand which parts of your codebase are covered by tests.

`yarn test:watch` - Launches the test runner in interactive watch mode, allowing you to run specific tests as you develop.

`yarn lint` - Lints the src directory files using ESLint to catch potential issues in your code. It helps maintain code quality and consistency across the project.

`yarn storybook` - Starts the Storybook server, allowing you to develop and review component stories in isolation.

Open `http://localhost:6006` to view it in your browser.

`yarn build-storybook` - Builds the Storybook configured in the project, which you can deploy to a static hosting service to share with your team.

Husky and Lint-Staged
This project uses Husky to run hooks and lint-staged to run ESLint checks on staged files. This ensures that your code is linted and follows the configured standards before you commit.

To set up Husky, run:

```bash
Copy code
yarn prepare
```
