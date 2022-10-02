import ExpressApplication from "./app";
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import ActivityRouter from "./routes/activity.router";
import expressJs from "express";
import TodoItemRouter from "./routes/todo.router";
const express = expressJs

export const parser = {
    json: express.json(),
    urlEncoded: express.urlencoded({extended: true})
}
expand(config());
const PORT: string | any = process.env.PORT || 3030;
export const Application = ExpressApplication.getInstance(PORT);
Application.useRouter("/activity-groups", ActivityRouter);
Application.useRouter("/todo-items", TodoItemRouter);
Application.init();
