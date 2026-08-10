import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist', 'coverage', 'node_modules', 'server/db.json'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...vue.configs['flat/recommended'],
    {
        files: ['**/*.{ts,vue}'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.vue'],
            },
            globals: {
                ...globals.browser,
            },
        },

        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'prefer-const': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
            ],
            'vue/html-indent': 'off',
            'vue/html-self-closing': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
            'vue/component-definition-name-casing': ['error', 'PascalCase'],
            'vue/custom-event-name-casing': ['error', 'camelCase'],
            'vue/define-emits-declaration': ['error', 'type-based'],
            'vue/define-props-declaration': ['error', 'type-based'],
            'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
            'vue/no-v-html': 'error',
            'vue/prefer-true-attribute-shorthand': 'error',
            'vue/require-default-prop': 'off',
            'vue/require-prop-types': 'off',
            'vue/attributes-order': 'error',
            'vue/block-order': [
                'error',
                {
                    order: ['template', 'script', 'style'],
                },
            ],
        },
    },
    {
        files: ['vite.config.ts', 'eslint.config.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
);
