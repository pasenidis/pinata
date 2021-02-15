const path = require("path");
const { createAsset } = require('./assets'); 

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

module.exports = { createGraph };