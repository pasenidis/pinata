import { createGraph } from './graphs';

const graph = createGraph("./example/index.js");
const result = bundle(graph);
console.log(result);