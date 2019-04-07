module.exports = {
  extends: 'standard',
  env: {
    browser: true,
    es6: true,
    jquery: true
  },
  globals: {
    "$": true,
    "jQuery": true,
    "fetch": true,
    "window": true,
    "document": true
  },
  env: {
    node: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
