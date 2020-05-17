"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var services_1 = require("../services");
var options = {
    strict: true,
    mergeParams: false,
    caseSensitive: false,
};
var $ = express_1.Router(options);
$.get("/user", services_1.accountService.user);
exports.default = $;
