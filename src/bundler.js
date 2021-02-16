const bundle = (graph) => {
  let modules = "";

  graph.forEach((mod) => {
    /*
      ${mod.id}: [
        function (require, module, exports) {
          ${mod.code}},
          ${JSON.stringify(mod.mapping)
        },
      ],
    */

    modules += `${mod.id}: [function (require, module, exports) {${
      mod.code
    }},${JSON.stringify(mod.mapping)},],`;
  });

  /*
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
  */

  const result = `(function(modules){function require(id) {const [fn, mapping]=modules[id];function localRequire(name){return require(mapping[name]);}const module = { exports: {} };fn(localRequire, module, module.exports);return module.exports;}require(0);})({${modules}})`;

  return result;
};

module.exports = { bundle };
