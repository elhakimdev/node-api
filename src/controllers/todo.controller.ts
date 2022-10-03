import { Request, Response } from 'express';
import Connection from '../database/connection';
import { Prisma } from '@prisma/client'
import moment from 'moment';
const prisma = Connection.getInstance().prisma;
export const TodoItemController = {
    /**
     * Fetch all activity groups
     * 
     * @param req {Request}
     * @param res {Response}
     */
     index: async (req: Request, res: Response) => {
        try {
            const data = await prisma.todo.findMany()
            if(data.length === 0){
                res.status(200).json({
                    status: "Success",
                    message: "Database Record is Empty",
                    data: null
                })
            } else {
                res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data: data
                })
            }
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: "Error",
                data: null,
                error: error
            })
        }
        
    },

    /**
     * Fetch activity group by id
     * 
     * @param req {Request}
     * @param res {Response}
     */
    show: async (req: Request, res: Response) => {
        try {
            const data = await prisma.todo.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            })

            if(!data){
                res.status(404).json({
                    status: "Not Found",
                    message: `Record id : ${req.params.id} not found`,
                    data: data
                })
            } else {
                res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data: data
                })
            }

        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: "Internal Server Error",
                data: null,
                error: error
            })
        }
    },

    /**
     * Create activity group by id
     * 
     * @param req {Request}
     * @param res {Response}
     */
    store: async (req: Request, res: Response) => {
    },

    /**
     * Update activity group by id
     * 
     * @param req {Request}
     * @param res {Response}
     */
    update: async (req: Request, res: Response) => {
    },

    /**
     * Delete activity group by id
     * 
     * @param req {Request}
     * @param res {Response}
     */
    delete: async (req: Request, res: Response) => {
    }
}