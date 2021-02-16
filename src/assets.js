const fs = require("fs");
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
      presets: ["@babel/preset-env", "minify"],
    });
  
    return {
      id,
      filename,
      dependencies,
      code,
    };
};

module.exports = { createAsset };