"use strict";
const return_1 = require("./return");
const options_1 = require("./options");
module.exports = function apiResponse(options) {
    return function (req, res, next) {
        let limit = 15;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        let page = 1;
        if (req.query.page) {
            page = (parseInt(req.query.page) - 1);
        }
        let _options = new options_1.Options(limit, page);
        if (options) {
            if (options.limit) {
                _options.limit = options.limit;
            }
            if (options.header) {
                _options.header = options.header;
            }
        }
        res.data = new return_1.Return({ req, res, next }, _options);
        next();
    };
};
