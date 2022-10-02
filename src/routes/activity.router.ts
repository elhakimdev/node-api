import express from "express";
import { ActivityController } from '../controllers/activity.controller';
const ActivityRouter = express.Router();
ActivityRouter.get("/", ActivityController.index)
ActivityRouter.get("/:id", ActivityController.show)
ActivityRouter.post("/", ActivityController.store)
ActivityRouter.patch("/:id", ActivityController.update)
ActivityRouter.delete("/:id", ActivityController.delete)
export default ActivityRouter; 