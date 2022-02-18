module.exports = {
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-native/all',
    'universe/native'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'react-native'],
  rules: {
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'comma-dangle': [2, 'never'],
    'no-trailing-spaces': [2],
    'import/order': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-boolean-value': [0],
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 2,
    'space-before-function-paren': 0,
    'react/prop-types': 'off',
    'react/jsx-no-undef': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-fragments': 'off'
  }
}
