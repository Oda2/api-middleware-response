"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Header {
    constructor(contentType) {
        this.contentType = contentType;
        if (!contentType) {
            this.contentType = "application/json";
        }
    }
}
exports.Header = Header;
