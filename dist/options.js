"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const header_1 = require("./header");
class Options {
    constructor(limit, page, header) {
        this.limit = limit;
        this.page = page;
        this.header = header;
        if (!header) {
            this.header = new header_1.Header('application/json');
            if (header) {
                if (header.contentType) {
                    this.header.contentType = header.contentType;
                }
            }
        }
    }
}
exports.Options = Options;
