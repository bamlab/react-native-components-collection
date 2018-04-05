module.exports = {
  extends: 'bambi',
  rules: {
    'prettier/prettier': 'error',
  },
  globals: {
    __DEV__: true,
    __dirname: '.'
  },
};
