'use strict';

const ReturnBase = require('./return-base');

module.exports = function () {
    return function (req, res, next) {
        res.data = {};
        let self = res.data;

        self.returnJson = function () {
            self.setHeaders();
            self.data.limit = self.req.query.limit;
            self.data.page = self.req.query.page;
            return self.res.status(self.data.statusCode).json(self.data.serialize());
        };

        self.setHeaders = function () {
            if (self.isExpress) {
                self.res.contentType('application/json');
            }
        };

        self.isExpress = true;
        self.res = res;
        self.req = req;
        self.data = new ReturnBase(self);

        res.data = self.data;
        res.returnJson = self.returnJson;
        next();
    }
};