"use strict";
const return_1 = require("./return");
const options_1 = require("./options");
const header_1 = require("./header");
module.exports = function apiResponse(options) {
    return function (req, res, next) {
        let page = 0;
        let limit = 15;
        if (req.query.page) {
            page = (parseInt(req.query.page) - 1);
        }
        else {
            req.query.page = page;
        }
        let header = null;
        if (options) {
            if (options.header) {
                if (options.header.contentType) {
                    header = new header_1.Header(options.header.contentType);
                }
            }
            if (options.limit) {
                limit = options.limit;
            }
        }
        if (req.query.limit) {
            if (req.query.limit < limit) {
                limit = req.query.limit;
            }
        }
        else {
            req.query.limit = limit;
        }
        if (!header) {
            header = new header_1.Header();
        }
        let _options = new options_1.Options(header, limit, page);
        res.data = new return_1.Return({ req, res, next }, _options);
        next();
    };
};
