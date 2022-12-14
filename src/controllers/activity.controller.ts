import { Request, Response } from 'express';
import Connection from '../database/connection';
import { Prisma } from '@prisma/client'
import moment from 'moment';
const prisma = Connection.getInstance().prisma;
export const ActivityController = {
    /**
     * Fetch all activity groups
     * 
     * @param req {Request}
     * @param res {Response}
     */
    index: async (req: Request, res: Response) => {
        try {
            const data = await prisma.activity.findMany()
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
            // console.log(error)
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
            const data = await prisma.activity.findUnique({
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
            // console.log(error)
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
        const {email, title} = req.body;
        try {

            const result = await prisma.activity.create({
                data: {
                    email: email,
                    title: title,
                    created_at: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
                    updated_at: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
                    // @ts-ignore
                    deleted_at: null
                }
            })

            res.status(201).json({
                status: "Success",
                message: "Success",
                data: result
            })
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
        try {
            const {title, email} = req.body
            const updated = await prisma.activity.update({
                where: {
                    id: Number(req.params.id)
                }, 
                data: {
                    title: title,
                    email: email
                }
            })

            res.status(200).json({
                status: "Success",
                message: "Success",
                data: updated
            })
        } catch (error) {
            // console.log(error)
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
            await prisma.activity.delete({
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