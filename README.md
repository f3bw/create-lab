# create-lab

A CLI tool to scaffold experiment projects for React, Next.js, Vite, and Three.js.

## Installation

### Local usage (recommended for development)

```bash
cd create-lab
npm install
npm link
```

### Global installation

```bash
npm install -g create-lab
```

### Via npx (after publishing to npm)

```bash
npx create-lab
```

## Usage

Run the CLI from any directory:

```bash
create-lab
```

You'll be prompted to:

1. **Project name** - lowercase letters, numbers, and dashes only
2. **Template** - choose from:
   - **React** - React 19 + Vite
   - **Next.js** - Next.js 15 + App Router + Turbopack
   - **Vite** - Vanilla TypeScript
   - **Three.js** - React + Three.js + React Three Fiber
3. **Initialize git** - creates a git repository
4. **Install dependencies** - runs `pnpm install` (or npm/yarn based on your environment)

## Templates

### React

Basic React setup with Vite bundler.

```
src/
├── components/
│   └── button/
├── hooks/
├── styles/
│   └── global.css
├── utils/
│   └── cn.ts
├── App.tsx
└── main.tsx
```

### Next.js

Next.js 15 with App Router and Turbopack.

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── page.module.css
├── components/
│   └── button/
├── styles/
│   └── global.css
└── utils/
    └── cn.ts
```

### Vite

Minimal vanilla TypeScript setup.

```
src/
├── styles/
│   └── global.css
└── main.ts
```

### Three.js

React with Three.js and React Three Fiber for 3D experiments.

```
src/
├── components/
│   └── canvas/
│       ├── scene.tsx
│       └── box.tsx
├── styles/
│   └── global.css
├── utils/
│   └── cn.ts
├── App.tsx
└── main.tsx
```

## Included tooling

All templates come with:

| Tool | Purpose |
|------|---------|
| **TypeScript** | Type safety with strict mode |
| **ESLint 9** | Flat config with recommended rules |
| **Prettier** | Code formatting (single quotes, no semicolons, 4-space indent) |
| **Stylelint** | CSS linting with alphabetical property ordering |
| **Husky** | Git hooks for pre-commit linting |
| **Commitlint** | Conventional commit message enforcement |

## CSS approach

Templates use **CSS Modules** with a utility-first approach:

- `cn()` utility for combining class names (using `clsx`)
- `class-variance-authority` (CVA) for component variants
- CSS custom properties (HSL colors) for theming
- CSS layers for style organization

Example component:

```tsx
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import styles from './button.module.css'

const buttonVariants = cva(styles.base, {
    variants: {
        variant: {
            primary: styles.primary,
            secondary: styles.secondary,
        },
    },
    defaultVariants: { variant: 'primary' },
})

export function Button({ className, variant, ...props }) {
    return <button className={cn(buttonVariants({ variant }), className)} {...props} />
}
```

## Scripts

All templates include these npm scripts:

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Run ESLint + Stylelint
pnpm lint:fix   # Fix linting errors
pnpm format     # Format with Prettier
```

## Commit conventions

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
perf: performance improvements
test: add tests
chore: maintenance tasks
revert: revert changes
```

## Publishing to npm

To make `npx create-lab` work publicly:

```bash
cd create-lab
npm login
npm publish
```

Ensure the package name `create-lab` is available, or use a scoped name like `@yourusername/create-lab`.

## License

MIT
