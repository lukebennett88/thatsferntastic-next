module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': ['error', '/apps/store/pages/'],
    '@next/next/no-img-element': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  ignorePatterns: ['.next'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
      plugins: ['@typescript-eslint', '@ts-gql'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        '@ts-gql/ts-gql': 'error',
      },
    },
  ],
};
