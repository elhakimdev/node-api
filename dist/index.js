"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.parser = void 0;
const app_1 = __importDefault(require("./app"));
const dotenv_1 = require("dotenv");
const dotenv_expand_1 = require("dotenv-expand");
const activity_router_1 = __importDefault(require("./routes/activity.router"));
const express_1 = __importDefault(require("express"));
const todo_router_1 = __importDefault(require("./routes/todo.router"));
const express = express_1.default;
exports.parser = {
    json: express.json(),
    urlEncoded: express.urlencoded({ extended: true })
};
(0, dotenv_expand_1.expand)((0, dotenv_1.config)());
const PORT = process.env.PORT || 3000;
exports.Application = app_1.default.getInstance(PORT);
exports.Application.useRouter("/activity-groups", activity_router_1.default);
exports.Application.useRouter("/todo-items", todo_router_1.default);
exports.Application.init();
