import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import checkFile from 'eslint-plugin-check-file'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
    ...tseslint.configs.recommended,
    globalIgnores(['dist/**', 'node_modules/**']),
    {
        plugins: {
            import: importPlugin,
            'check-file': checkFile,
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        {
                            target: [
                                './src/core',
                                './src/utils',
                                './src/ui',
                            ],
                            from: ['./src/experiments'],
                        },
                    ],
                },
            ],
            'check-file/filename-naming-convention': [
                'error',
                {
                    '**/*.{ts,tsx}': 'KEBAB_CASE',
                },
                {
                    ignoreMiddleExtensions: true,
                },
            ],
            'check-file/folder-naming-convention': [
                'error',
                {
                    'src/**/!(__tests__)': 'KEBAB_CASE',
                },
            ],
        },
    },
])
