(function(modules){function require(id) {const [fn, mapping]=modules[id];function localRequire(name){return require(mapping[name]);}const module = { exports: {} };fn(localRequire, module, module.exports);return module.exports;}require(0);})({0: [function (require, module, exports) {"use strict";var _log=_interopRequireDefault(require("./log"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}(0,_log["default"])();},{"./log":1},],1: [function (require, module, exports) {"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _name=require("./name"),_default=function(){return console.log("Hello, ".concat(_name.name))};exports["default"]=_default;},{"./name":2},],2: [function (require, module, exports) {"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.name=void 0;var name="Edward";exports.name="Edward";},{},],})