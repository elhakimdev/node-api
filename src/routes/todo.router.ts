import express from 'express';
import { TodoItemController } from '../controllers/todo.controller';
const TodoItemRouter = express.Router();
TodoItemRouter.get("/", TodoItemController.index)
TodoItemRouter.get("/:id", TodoItemController.show)
TodoItemRouter.post("/", TodoItemController.store)
TodoItemRouter.patch("/:id", TodoItemController.update)
TodoItemRouter.delete("/:id", TodoItemController.delete)
export default TodoItemRouter;