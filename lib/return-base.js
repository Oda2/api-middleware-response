module.exports = function ReturnBase(response) {
    this.response = response;
    this.success = false;
    this.isArray = false;
    this.page = 0;
    this.limit = 0;
    this.statusCode = -1;
    this.message = '';
    this.data = {};
    this._count = 0;

    this.serialize = function () {
        if (!this.success) {
            return this._serializeDefault();
        }

        if (this.isArray) {
            return this._serializeArray();
        }

        return this._serialize();
    };

    this._serialize = function () {
        return {
            success: this.success,
            data: this.data
        }
    };

    this._serializeArray = function () {
        var pages = Math.ceil((this._count / this.limit));

        return {
            success: this.success,
            paging: {
                total: this._count,
                pages: pages,
                currentPage: (this.page + 1),
                perPage: this.limit
            },
            data: this.data
        }
    };

    this._serializeDefault = function () {
        return {
            success: this.success,
            message: this.message,
            data: {}
        }
    }

    this.setObject = function (data) {
        this.data = data;
        this.success = true;

        if (arguments[1]) {
            this.statusCode = arguments[1];
        } else if (this.statusCode === -1) {
            this.statusCode = 200;
        }

        return this.response;
    }

    this.setArrayObject = function (data) {
        this.isArray = true;
        if (data.count && data.rows) {
            this._count = data.count;
            return this.setObject(data.rows);
        } else if ((data.length) && (data.length > 0)) {
            this._count = data.length;
            return this.setObject(data);
        } else {
            if (data.count === 0) {
                return this.setObject(data.rows);
            }
        }

        return this.response;
    }

    this.setDeleteResource = function (message) {
        this.success = true;
        this.message = message;
        this.statusCode = 204;

        return this.response;
    }

    this.setInvalidRequest = function (message) {
        this.message = message;
        this.success = false;

        if (this.statusCode === -1) {
            this.statusCode = 400;
        }

        return this.response;
    }

    this.setDataNotFound = function () {
        this.success = true;
        this.data = {};
        this.statusCode = 404;
        return this.response;
    }
}