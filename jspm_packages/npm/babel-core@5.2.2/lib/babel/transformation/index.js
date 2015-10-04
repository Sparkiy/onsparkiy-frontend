/* */ 
"format cjs";
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;
exports["default"] = transform;

var _normalizeAst = require("../helpers/normalize-ast");

var _normalizeAst2 = _interopRequireDefault(_normalizeAst);

var _Transformer = require("./transformer");

var _Transformer2 = _interopRequireDefault(_Transformer);

var _object = require("../helpers/object");

var _object2 = _interopRequireDefault(_object);

var _File = require("./file");

var _File2 = _interopRequireDefault(_File);

var _each = require("lodash/collection/each");

var _each2 = _interopRequireDefault(_each);

var _rawTransformers = require("./transformers");

var _rawTransformers2 = _interopRequireDefault(_rawTransformers);

function transform(code, opts) {
  var file = new _File2["default"](opts);
  return file.parse(code);
}

transform.fromAst = function (ast, code, opts) {
  ast = _normalizeAst2["default"](ast);

  var file = new _File2["default"](opts);
  file.addCode(code);
  file.transform(ast);
  return file.generate();
};

transform._ensureTransformerNames = function (type, rawKeys) {
  var keys = [];

  for (var i = 0; i < rawKeys.length; i++) {
    var key = rawKeys[i];

    var deprecatedKey = transform.deprecatedTransformerMap[key];
    var aliasKey = transform.aliasTransformerMap[key];
    if (aliasKey) {
      keys.push(aliasKey);
    } else if (deprecatedKey) {
      // deprecated key, remap it to the new one
      console.error("The transformer " + key + " has been renamed to " + deprecatedKey);
      rawKeys.push(deprecatedKey);
    } else if (transform.transformers[key]) {
      // valid key
      keys.push(key);
    } else if (transform.namespaces[key]) {
      // namespace, append all transformers within this namespace
      keys = keys.concat(transform.namespaces[key]);
    } else {
      // invalid key
      throw new ReferenceError("Unknown transformer " + key + " specified in " + type);
    }
  }

  return keys;
};

transform.transformerNamespaces = _object2["default"]();
transform.transformers = _object2["default"]();
transform.namespaces = _object2["default"]();

transform.deprecatedTransformerMap = require("./transformers/deprecated");
transform.aliasTransformerMap = require("./transformers/aliases");
transform.moduleFormatters = require("./modules");

_each2["default"](_rawTransformers2["default"], function (transformer, key) {
  var namespace = key.split(".")[0];

  transform.namespaces[namespace] = transform.namespaces[namespace] || [];
  transform.namespaces[namespace].push(key);
  transform.transformerNamespaces[key] = namespace;

  transform.transformers[key] = new _Transformer2["default"](key, transformer);
});
module.exports = exports["default"];