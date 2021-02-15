const fs = require("fs");
const path = require("path");
const { transformFromAst } = require("@babel/core");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;

let ID = 0;

const createAsset = (filename) => {
  const file = fs.readFileSync(filename, "utf-8");

  const ast = babylon.parse(file, {
    sourceType: "module",
  });

  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  const id = ID++;

  const { code } = transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return {
    id,
    filename,
    dependencies,
    code,
  };
};

const createGraph = (entry) => {
  const asset = createAsset(entry);

  const queue = [asset];

  for (const asset of queue) {
    asset.mapping = {};

    const dirname = path.dirname(asset.filename);

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath) + ".js";

      const child = createAsset(absolutePath);

      asset.mapping[relativePath] = child.id;

      queue.push(child);
    });
  }

  return queue;
};

const bundle = (graph) => {
  let modules = "";

  graph.forEach((mod) => {
    modules += `${mod.id}: [
        function (require, module, exports) {
          ${mod.code}
        },
        ${JSON.stringify(mod.mapping)},
      ],`;
  });

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(name) {
          return require(mapping[name]);
        }

        const module = { exports: {} };
        
        fn(localRequire, module, module.exports);
        
        return module.exports;
      }

      require(0);
    })({${modules}})
  `;

  return result;
};

const graph = createGraph("./example/index.js");
const result = bundle(graph);
console.log(result);
module.exports = { createAsset };
