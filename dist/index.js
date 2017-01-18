"use strict";
var joi = require("joi");
exports.createValidator = function (createSchema, options) {
    if (options === void 0) { options = { abortEarly: false }; }
    var schema;
    if (typeof createSchema === 'function') {
        schema = createSchema(joi);
    }
    else {
        schema = joi.compile(createSchema);
    }
    return function (value) { return joi.validate(value, schema, options); };
};
//# sourceMappingURL=index.js.map