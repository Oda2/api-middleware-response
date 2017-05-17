"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class ReturnBase {
    constructor(self) {
        this.self = self;
        this.success = false;
        this.isArray = false;
    }
    setHeaders() {
        this.self.res.contentType('application/json');
    }
    returnJson() {
        this.setHeaders();
        this.limit = this.self.req.query.limit;
        this.page = this.self.req.query.page;
        return this.self.res.status(this.statusCode).json(this.serialize());
    }
    serialize() {
        if (!this.success) {
            return this.serializeDefault();
        }
        if (this.isArray) {
            return this.serializeArray();
        }
        return this.serializeObject();
    }
    serializeDefault() {
        return {
            success: this.success,
            message: this.message,
            data: {}
        };
    }
    serializeArray() {
        let pages = 0;
        if (this.count > 0 && this.limit > 0) {
            pages = Math.ceil((this.count / this.limit));
        }
        let currentPage = (pages + 1);
        /* TO-DO Custom return */
        return {
            success: this.success,
            paging: {
                total: this.count,
                pages: pages,
                currentPage: currentPage,
                perPage: this.limit
            },
            data: this.data
        };
    }
    serializeObject() {
        // TO-DO { Sequelize Object (this.data.?) }
        return this.data;
    }
    setObject(data, statusCode) {
        this.data = data;
        this.success = true;
        this.isArray = false;
        if (statusCode) {
            this.statusCode = statusCode;
        }
        else {
            this.statusCode = 200;
        }
        return this.returnJson();
    }
    setArrayObject(data, statusCode) {
        this.success = true;
        this.isArray = true;
        if (_.isArray(data)) {
            this.data = data;
            this.count = data.length;
        }
        else if ((data) && (data.rows)) {
            this.data = data.rows;
            this.count = data.count;
        }
        else {
            throw new RangeError("invalid arguments");
        }
        if (statusCode) {
            this.statusCode = statusCode;
        }
        else {
            this.statusCode = 200;
        }
        return this.returnJson();
    }
    returnNoContent() {
        return this.self.res.status(this.statusCode).json({});
    }
    setAccepted() {
        this.data = {};
        this.success = true;
        this.statusCode = 202;
        return this.returnNoContent();
    }
    setDeleteResource() {
        this.data = {};
        this.success = true;
        this.statusCode = 204;
        return this.returnNoContent();
    }
    setNoContent() {
        return this.setDeleteResource();
    }
    setInvalidRequest(message, statusCode) {
        this.data = {};
        this.success = false;
        this.message = message;
        if (statusCode) {
            this.statusCode = statusCode;
        }
        else {
            this.statusCode = 400;
        }
        return this.returnJson();
    }
    setDataNotFound() {
        this.data = {};
        this.success = false;
        this.statusCode = 404;
        return this.returnJson();
    }
    setInternalServerError(message) {
        this.data = {};
        this.success = false;
        this.statusCode = 500;
        this.message = message;
        return this.returnJson();
    }
}
exports.ReturnBase = ReturnBase;
