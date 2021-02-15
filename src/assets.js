const { transformFromAst } = require("@babel/core");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;

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

export { createAsset };