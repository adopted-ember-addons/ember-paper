/* eslint-disable prettier/prettier */
'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'attribute-indentation': false,
    'no-inline-styles': false
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      rules: {
        // TODO remove these later
        'no-curly-component-invocation': false,
        'no-autofocus-attribute': false,
        'no-unused-block-params': false,
        'require-button-type': false,
        'require-input-label': false,
        'no-implicit-this': false,
      },
    },
  ],
};
