"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Header {
    constructor(contentType) {
        this.contentType = contentType;
        if (!contentType) {
            contentType = "application/json";
        }
    }
}
exports.Header = Header;
