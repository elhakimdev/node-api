"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class Connection {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    static getInstance() {
        if (!Connection.instance) {
            Connection.instance = new Connection();
        }
        return Connection.instance;
    }
}
exports.default = Connection;
