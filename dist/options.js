"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Options {
    constructor(limit, header) {
        this.limit = limit;
        this.header = header;
        if (!header) {
            this.header = {
                "contentType": "application/json"
            };
        }
    }
}
exports.Options = Options;
