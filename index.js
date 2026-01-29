#!/usr/bin/env node
import * as p from '@clack/prompts'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import pc from 'picocolors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TEMPLATES = {
    react: {
        name: 'React',
        description: 'React + Vite with CSS Modules',
        color: pc.cyan,
    },
    nextjs: {
        name: 'Next.js',
        description: 'Next.js 15 with App Router & CSS Modules',
        color: pc.white,
    },
    vite: {
        name: 'Vite',
        description: 'Vanilla TypeScript + Vite',
        color: pc.yellow,
    },
    threejs: {
        name: 'Three.js',
        description: 'React + Three.js + Vite',
        color: pc.magenta,
    },
}

async function main() {
    console.clear()

    p.intro(pc.bgCyan(pc.black(' create-lab ')))

    const project = await p.group(
        {
            name: () =>
                p.text({
                    message: 'Project name',
                    placeholder: 'my-experiment',
                    validate: (value) => {
                        if (!value) return 'Please enter a project name'
                        if (!/^[a-z0-9-]+$/.test(value))
                            return 'Use lowercase letters, numbers, and dashes only'
                    },
                }),
            template: () =>
                p.select({
                    message: 'Select a template',
                    options: Object.entries(TEMPLATES).map(([value, { name, description, color }]) => ({
                        value,
                        label: color(name),
                        hint: description,
                    })),
                }),
            git: () =>
                p.confirm({
                    message: 'Initialize git repository?',
                    initialValue: true,
                }),
            install: () =>
                p.confirm({
                    message: 'Install dependencies?',
                    initialValue: true,
                }),
        },
        {
            onCancel: () => {
                p.cancel('Operation cancelled')
                process.exit(0)
            },
        }
    )

    const s = p.spinner()

    const templateDir = path.join(__dirname, 'templates', project.template)
    const targetDir = path.join(process.cwd(), project.name)

    // Check if directory exists
    if (fs.existsSync(targetDir)) {
        const overwrite = await p.confirm({
            message: `Directory ${project.name} already exists. Overwrite?`,
            initialValue: false,
        })
        if (!overwrite) {
            p.cancel('Operation cancelled')
            process.exit(0)
        }
        fs.removeSync(targetDir)
    }

    // Copy template
    s.start('Creating project')
    await fs.copy(templateDir, targetDir)

    // Update package.json name
    const pkgPath = path.join(targetDir, 'package.json')
    if (fs.existsSync(pkgPath)) {
        const pkg = await fs.readJson(pkgPath)
        pkg.name = project.name
        await fs.writeJson(pkgPath, pkg, { spaces: 4 })
    }
    s.stop('Project created')

    // Initialize git
    if (project.git) {
        s.start('Initializing git')
        try {
            execSync('git init', { cwd: targetDir, stdio: 'ignore' })
            s.stop('Git initialized')
        } catch {
            s.stop('Git initialization failed')
        }
    }

    // Install dependencies
    if (project.install) {
        s.start('Installing dependencies')
        try {
            const pkgManager = detectPackageManager()
            execSync(`${pkgManager} install`, { cwd: targetDir, stdio: 'ignore' })
            s.stop('Dependencies installed')
        } catch {
            s.stop('Installation failed - run manually')
        }
    }

    const nextSteps = [`cd ${project.name}`]
    if (!project.install) {
        nextSteps.push('pnpm install')
    }
    nextSteps.push('pnpm dev')

    p.note(nextSteps.join('\n'), 'Next steps')

    p.outro(pc.green('Happy experimenting!'))
}

function detectPackageManager() {
    const userAgent = process.env.npm_config_user_agent || ''
    if (userAgent.startsWith('pnpm')) return 'pnpm'
    if (userAgent.startsWith('yarn')) return 'yarn'
    if (userAgent.startsWith('bun')) return 'bun'
    return 'npm'
}

main().catch(console.error)
