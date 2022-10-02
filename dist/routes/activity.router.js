"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_controller_1 = require("../controllers/activity.controller");
const ActivityRouter = express_1.default.Router();
ActivityRouter.get("/", activity_controller_1.ActivityController.index);
ActivityRouter.get("/:id", activity_controller_1.ActivityController.show);
ActivityRouter.post("/", activity_controller_1.ActivityController.store);
ActivityRouter.patch("/:id", activity_controller_1.ActivityController.update);
ActivityRouter.delete("/:id", activity_controller_1.ActivityController.delete);
exports.default = ActivityRouter;
