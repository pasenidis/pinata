const { createGraph } = require('./src/graphs');
const { bundle } = require('./src/bundler');

const graph = createGraph("./example/index.js");
const result = bundle(graph);

console.log(result);