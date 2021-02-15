const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;

let ID = 0;

const createAsset = (filename) => {
    const file = fs.readFileSync(filename, 'utf-8');
    
    const ast = babylon.parse(file, {
        sourceType: "module",
    });

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value);
        }
    });

    const id = ID++;

    return {
        id,
        filename,
        dependencies,
    }
}

module.exports = { createAsset }; 