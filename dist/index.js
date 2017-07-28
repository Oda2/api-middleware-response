"use strict";
const return_1 = require("./return");
const options_1 = require("./options");
function middlewareExpress(req, res, next) {
    let limit = parseInt(req.query.limit) || 15;
    let page = (parseInt(req.query.page) || 1) - 1;
    let options = new options_1.Options(limit);
    req.query.page = page;
    res.data = new return_1.Return({ req, res, next }, options);
    next();
}
module.exports = middlewareExpress;
