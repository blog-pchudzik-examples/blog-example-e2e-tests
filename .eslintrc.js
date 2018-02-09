module.exports = {
  "extends": "airbnb-base",
  "env": {
    "mocha": true,
  },
  "globals": {
    "browser": true,
    "$": true,
  },
  "rules": {
    "no-use-before-define": ["error", { "functions": false }],
    "class-methods-use-this": "off"
  },
};
