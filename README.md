# mnews-personal-ads

A React + Vite based internal admin project with TypeScript, Tailwind CSS, ESLint, Prettier, and Husky.

## Tech Stack

- [Vite](https://vitejs.dev/) (Build tool)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [React Router](https://reactrouter.com/) 7
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged) for git hooks

## Requirements

- **Node.js**: `22.20.0` (installed locally during development)  
  - Recommended: Node.js LTS (20.x or 22.x)  
- **Package manager**: [pnpm](https://pnpm.io/) v9+

> Note: The project was initialized with Node.js `20.20.0`.  
> Other active LTS versions (>=18.18.0) should work, but 20.x is preferred.

## Getting Started

```bash
# install dependencies
pnpm install

# start development server
pnpm dev

# build for production
pnpm build

# lint check
pnpm lint

# lint with auto-fix
pnpm lint:fix
