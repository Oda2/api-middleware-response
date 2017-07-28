"use strict";
const return_1 = require("./return");
const options_1 = require("./options");
const header_1 = require("./header");
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
        let header = null;
        if (options) {
            if (options.header) {
                if (options.header.contentType) {
                    header = new header_1.Header(options.header.contentType);
                }
                if (options.limit) {
                    limit = options.limit;
                }
            }
        }
        if (!header) {
            header = new header_1.Header();
        }
        let _options = new options_1.Options(header, limit, page);
        res.data = new return_1.Return({ req, res, next }, _options);
        next();
    };
};
