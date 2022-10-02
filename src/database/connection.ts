import { PrismaClient } from '@prisma/client';

class Connection {
    public prisma: PrismaClient;
    private static instance: Connection;
    private constructor(){
        this.prisma = new PrismaClient()
    }

    public static getInstance(){
        if(!Connection.instance){
            Connection.instance = new Connection()
        }

        return Connection.instance;
    }
}

export default Connection