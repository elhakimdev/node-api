"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityController = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const client_1 = require("@prisma/client");
const moment_1 = __importDefault(require("moment"));
const prisma = connection_1.default.getInstance().prisma;
exports.ActivityController = {
    /**
     * Fetch all activity groups
     *
     * @param req {Request}
     * @param res {Response}
     */
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.activityGroup.findMany();
            if (data.length === 0) {
                res.status(200).json({
                    status: "Success",
                    message: "Database Record is Empty",
                    data: null
                }).header("X");
            }
            else {
                res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data: data
                });
            }
        }
        catch (error) {
            res.status(500).json({
                status: "Error",
                message: "Error",
                data: null,
                error: error
            });
        }
    }),
    /**
     * Fetch activity group by id
     *
     * @param req {Request}
     * @param res {Response}
     */
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.activityGroup.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            });
            if (!data) {
                res.status(404).json({
                    status: "Not Found",
                    message: `Record id : ${req.params.id} not found`,
                    data: data
                });
            }
            else {
                res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data: data
                });
            }
        }
        catch (error) {
            res.status(500).json({
                status: "Error",
                message: "Internal Server Error",
                data: null,
                error: error
            });
        }
    }),
    /**
     * Create activity group by id
     *
     * @param req {Request}
     * @param res {Response}
     */
    store: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, title } = req.body;
        try {
            const result = yield prisma.activityGroup.create({
                data: {
                    email: email,
                    title: title,
                    created_at: new Date((0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                    updated_at: new Date((0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                    // @ts-ignore
                    deleted_at: null
                }
            });
            res.status(201).json({
                status: "Success",
                message: "Success",
                data: result
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    res.status(500).json({
                        status: "Error",
                        message: 'There is a unique constraint violation, a new user cannot be created with this email',
                        data: null
                    });
                }
            }
        }
    }),
    /**
     * Update activity group by id
     *
     * @param req {Request}
     * @param res {Response}
     */
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, email } = req.body;
            const updated = yield prisma.activityGroup.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    title: title,
                    email: email
                }
            });
            res.status(404).json({
                status: "Success",
                message: "Success",
                data: updated
            });
        }
        catch (error) {
            // console.log(error)
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    res.status(500).json({
                        status: "Error",
                        message: `Updating Record id : ${req.params.id} failed because record to update not found`,
                        data: null
                    });
                }
            }
        }
    }),
    /**
     * Delete activity group by id
     *
     * @param req {Request}
     * @param res {Response}
     */
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.activityGroup.delete({
                where: {
                    id: Number(req.params.id)
                }
            });
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: {}
            });
        }
        catch (error) {
            // console.log(error)
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    res.status(500).json({
                        status: "Error",
                        message: `Deleting Record id : ${req.params.id} failed because record to delete not found`,
                        data: null
                    });
                }
            }
        }
    })
};
