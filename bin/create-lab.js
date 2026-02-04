#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'
import pc from 'picocolors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templatesDir = path.join(__dirname, '..', 'templates')

const TEMPLATES = {
    'vite-2d': {
        name: 'Vite 2D (GSAP + DOM animations)',
        color: pc.cyan,
        description: 'DOM-based animations with GSAP, ScrollTrigger, SplitText',
    },
    'vite-3d': {
        name: 'Vite 3D (Three.js + WebGL)',
        color: pc.magenta,
        description: 'WebGL/3D graphics with Three.js, shaders, OrbitControls',
    },
    nextjs: {
        name: 'Next.js (React + TypeScript)',
        color: pc.blue,
        description: 'Next.js app with TypeScript, ESLint, Prettier, Stylelint',
    },
}

async function main() {
    console.log()
    console.log(pc.bold(pc.green('🧪 create-lab')))
    console.log(pc.dim('Scaffold a new lab project\n'))

    // Get project name from args or prompt
    let projectName = process.argv[2]

    if (!projectName) {
        const response = await prompts({
            type: 'text',
            name: 'projectName',
            message: 'Project name:',
            initial: 'my-lab',
            validate: (value) =>
                value.length > 0 ? true : 'Project name is required',
        })

        if (!response.projectName) {
            console.log(pc.red('\n✖ Operation cancelled'))
            process.exit(1)
        }

        projectName = response.projectName
    }

    // Select template
    const templateResponse = await prompts({
        type: 'select',
        name: 'template',
        message: 'Select a template:',
        choices: Object.entries(TEMPLATES).map(([value, { name, color }]) => ({
            title: color(name),
            value,
        })),
    })

    if (!templateResponse.template) {
        console.log(pc.red('\n✖ Operation cancelled'))
        process.exit(1)
    }

    const template = templateResponse.template
    const templateInfo = TEMPLATES[template]
    const targetDir = path.resolve(process.cwd(), projectName)

    // Check if directory exists
    if (fs.existsSync(targetDir)) {
        const overwrite = await prompts({
            type: 'confirm',
            name: 'overwrite',
            message: `Directory ${pc.yellow(projectName)} already exists. Overwrite?`,
            initial: false,
        })

        if (!overwrite.overwrite) {
            console.log(pc.red('\n✖ Operation cancelled'))
            process.exit(1)
        }

        fs.rmSync(targetDir, { recursive: true, force: true })
    }

    // Copy template
    console.log()
    console.log(`${pc.dim('Creating project in')} ${pc.cyan(targetDir)}`)

    const templateDir = path.join(templatesDir, template)
    copyDir(templateDir, targetDir)

    // Update package.json with project name
    const pkgPath = path.join(targetDir, 'package.json')
    if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
        pkg.name = projectName
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
    }

    // Success message
    console.log()
    console.log(pc.green('✔ Project created successfully!'))
    console.log()
    console.log(pc.dim('Template: ') + templateInfo.color(templateInfo.name))
    console.log(pc.dim(templateInfo.description))
    console.log()
    console.log('Next steps:')
    console.log()
    console.log(`  ${pc.cyan('cd')} ${projectName}`)
    console.log(`  ${pc.cyan('pnpm install')}`)
    console.log(`  ${pc.cyan('pnpm dev')}`)
    console.log()
}

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true })

    for (const file of fs.readdirSync(src)) {
        // Skip node_modules and other generated files
        if (
            file === 'node_modules' ||
            file === 'dist' ||
            file === '.next' ||
            file === 'pnpm-lock.yaml' ||
            file === 'package-lock.json' ||
            file === '.git'
        ) {
            continue
        }

        const srcPath = path.join(src, file)
        const destPath = path.join(dest, file)
        const stat = fs.statSync(srcPath)

        if (stat.isDirectory()) {
            copyDir(srcPath, destPath)
        } else {
            fs.copyFileSync(srcPath, destPath)
        }
    }
}

main().catch((err) => {
    console.error(pc.red('Error:'), err.message)
    process.exit(1)
})
