import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Ensure import order
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules (fs, path, etc.)
            'external', // External packages (react, lodash, etc.)
            'internal', // Internal project aliases (e.g., @/components)
            ['parent', 'sibling', 'index'], // Relative imports
            'object', // CommonJS imports like: import foo = require("foo")
            'type', // TypeScript type-only imports
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always', // Always insert a blank line between groups
          alphabetize: {
            order: 'asc', // Alphabetical order (A → Z)
            caseInsensitive: true,
          },
        },
      ],
    },
  },
])
