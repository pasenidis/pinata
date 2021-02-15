const { createAsset } = require('../src/bundler');

const mainAsset = createAsset('./index.js');
console.log(mainAsset);