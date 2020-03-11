module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  extends: '@react-native-community',
  rules: {
    radix: ['error', 'as-needed'],
  },
  extends: ['plugin:prettier/recommended'],
};
