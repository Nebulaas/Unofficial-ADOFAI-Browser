
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],

  rules: {
    "quotes": ["error", "single"],

    "prefer-const": "warn",

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",

    "no-explicit-any": "off",
    "@typescript-eslint/no-explicit-any": "off",

    "ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-comment": "off",

    "react/prop-types": [
      "warn"
    ],

    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "semi": false,
        "parser": "babel-flow",
        "singleAttributePerLine": false,
      }
    ]
  }
}
