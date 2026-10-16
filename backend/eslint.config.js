import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Force all logging through the Logger facade.
      'no-console': 'error',
      // Allow unused args prefixed with _ (underscore)
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    // Logger implementations are the only place allowed to use console.
    files: ['src/lib/logger/**/*.js','src/lib/logger/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
]);