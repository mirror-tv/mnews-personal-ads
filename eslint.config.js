import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
// import tailwindcssPlugin from 'eslint-plugin-tailwindcss' // (Temporarily commented out due to incomplete support for Tailwind CSS v4)

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
      prettier: prettierPlugin,
      // tailwindcss: tailwindcssPlugin,  // (Temporarily omitted to avoid issues with Tailwind v4)
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'react-refresh/only-export-components': 'warn', // for Vite + React Refresh
      'prettier/prettier': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // (Temporarily omitted to avoid issues with Tailwind v4)
      // 'tailwindcss/classnames-order': 'off',
      // 'tailwindcss/enforces-shorthand': 'error',
      // 'tailwindcss/no-unnecessary-arbitrary-value': 'error',

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
