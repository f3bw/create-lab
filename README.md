# create-lab

CLI tool to scaffold lab projects with pre-configured tooling.

## Templates

| Template | Stack | Use case |
|----------|-------|----------|
| `vite-2d` | Vite + GSAP + TypeScript | DOM animations, scroll effects, text animations |
| `vite-3d` | Vite + Three.js + TypeScript | WebGL, 3D graphics, shaders |
| `nextjs` | Next.js + React + TypeScript | Full-stack React applications |

All templates include ESLint, Prettier, and Stylelint pre-configured.

## Installation

```bash
cd create-lab
pnpm install
pnpm link --global
```

## Usage

```bash
# Interactive mode
create-lab

# With project name
create-lab my-project
```

Then follow the prompts to select a template.

## After scaffolding

```bash
cd my-project
pnpm install
pnpm dev
```

## Available scripts (all templates)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |
| `pnpm lint` | Run ESLint |
| `pnpm lint:css` | Run Stylelint |
| `pnpm format` | Format with Prettier |
