"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.log = void 0;
exports.log = function (data) {
    if (process.env.NODE_ENV !== 'production')
        console.log(data);
};
exports.error = function (data) {
    if (process.env.NODE_ENV !== 'production')
        console.error(data);
};
