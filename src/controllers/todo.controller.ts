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
        const { title, activity_group_id } = req.body;
        try {
            if(activity_group_id){
                const result = await prisma.todo.create({
                    data:{
                        title: title,
                        is_active: true,
                        priority: "very-high",
                        created_at: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
                        updated_at:  new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
                        deleted_at: null,
                        activity_group_id: activity_group_id,
                    }
                })
                res.status(201).json({
                    status: "Success",
                    message: "Success",
                    data: result
                })
            } else {
                const result = await prisma.todo.create({
                    // @ts-ignore
                    data:{
                        title: title,
                        is_active: true,
                        priority: "very-high",
                        created_at: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
                        updated_at:  new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
                        deleted_at: null,
                        activity_group_id: undefined,
                        activity: undefined
                    }
                })
                res.status(201).json({
                    status: "Success",
                    message: "Success",
                    data: result
                })
            }

        } catch (error) {
            // console.log(error)
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    res.status(500).json({
                        status: "Error",
                        message: 'There is a unique constraint violation, a new user cannot be created with this email',
                        data: null
                    })
                }
            }
        }
    },

    /**
     * Update activity group by id
     * 
     * @param req {Request}
     * @param res {Response}
     */
    update: async (req: Request, res: Response) => {
        const { title, activity_group_id, priority, is_active } = req.body;
        try {
            if(activity_group_id){
                const updated = await prisma.todo.update({
                    where: {
                        id: Number(req.params.id)
                    }, 
                    data: {
                        title: title,
                        priority: priority,
                        is_active: is_active,
                        activity_group_id: activity_group_id,
                    }
                })
    
                res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data: updated
                })
            } else {
                const updated = await prisma.todo.update({
                    where: {
                        id: Number(req.params.id)
                    }, 
                    data: {
                        title: title,
                        priority: priority,
                        is_active: is_active,
                        // activity_group_id: activity_group_id
                    }
                })
    
                res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data: updated
                })
            }
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2025'){
                    res.status(500).json({
                        status: "Error",
                        message: `Updating Record id : ${req.params.id} failed because record to update not found`,
                        data: null
                    })
                }
            }
        }
    },

    /**
     * Delete activity group by id
     * 
     * @param req {Request}
     * @param res {Response}
     */
    delete: async (req: Request, res: Response) => {
        try {
            await prisma.todo.delete({
                where: {
                    id: Number(req.params.id)
                }
            })

            res.status(200).json({
                status: "Success",
                message: "Success",
                data: {}
            })
        } catch (error) {
            // console.log(error)
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2025'){
                    res.status(500).json({
                        status: "Error",
                        message: `Deleting Record id : ${req.params.id} failed because record to delete not found`,
                        data: null
                    })
                }
            }
        }
    }
}