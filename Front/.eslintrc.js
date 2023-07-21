module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/strongly-recommended',
    'plugin:prettier/recommended',
    '@vue/typescript/recommended',
    'eslint:recommended'
  ],
  plugins: ['@typescript-eslint', 'vitest', 'prettier'],
  // add your custom rules here
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],
    'vue/require-explicit-emits': ['error', { allowProps: false }],
    'vue/multi-word-component-name': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/no-reserved-component-names': [
      'error',
      {
        disallowVueBuiltInComponents: true,
        disallowVue3BuiltInComponents: true
      }
    ],
    'vue/comment-directive': 0,
    'vue/require-prop-types': 0,

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    'no-undef': 'off',
    'no-unreachable': 'off',
    'prefer-regex-literals': 0,
    'prettier/prettier': [
      'error',
      {
        semi: false,
        arrowParens: 'always',
        singleQuote: true,
        printWidth: 150
      }
    ],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}
