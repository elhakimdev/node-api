"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controllers/todo.controller");
const TodoItemRouter = express_1.default.Router();
TodoItemRouter.get("/", todo_controller_1.TodoItemController.index);
TodoItemRouter.get("/:id", todo_controller_1.TodoItemController.show);
TodoItemRouter.post("/", todo_controller_1.TodoItemController.store);
TodoItemRouter.patch("/:id", todo_controller_1.TodoItemController.update);
TodoItemRouter.delete("/:id", todo_controller_1.TodoItemController.delete);
exports.default = TodoItemRouter;
