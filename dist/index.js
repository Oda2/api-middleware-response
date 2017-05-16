"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnbase_1 = require("./returnbase");
const middlewareExpress = function middlewareExpress(req, res, next) {
    res.data = new returnbase_1.ReturnBase({ req, res, next });
    next();
};
function middleware() {
    return middlewareExpress;
}
exports.middleware = middleware;
;
