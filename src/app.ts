import express, { Application, NextFunction, Request, Response, RouterOptions, Router, response } from 'express';
import { parser } from '.';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
expand(config());


/**
 * The ExpressApplication class defines the `getInstance` method that lets clients access
 * the unique ExpressApplication instance.
 */
 class ExpressApplication {
    private static instance: ExpressApplication;
    protected port: string;
    protected express: Application;

    /**
     * The ExpressApplication's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor(
        port: string = '',
    ) {
        this.express = express();

        const cors = require('cors');
        const morgan = require('morgan');
        const {json, urlEncoded} = parser;
        this.express.use(json)
        this.express.use(urlEncoded)
        this.express.use(cors())
        this.express.use(morgan("combined"))
        this.port = port;
    }

    /**
     * The static method that controls the access to the ExpressApplication instance.
     *
     * This implementation let you subclass the ExpressApplication class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(port: string): ExpressApplication {
        if (!ExpressApplication.instance) {
            ExpressApplication.instance = new ExpressApplication(port);
        }

        return ExpressApplication.instance;
    }
    
    /**
     * Starting express application
     */
    public init() : void {
        this.express.listen(this.port, () => {
            console.log(`Express Server is listening on port ${this.port}`);
            console.log(`Express Server ready at: http://${process.env.API_URL}:${this.port}`)
        })
    }

    /**
     * Load router
     * 
     * @param path 
     * @param routes 
     */
    public useRouter(path: string, routes: Router){
        this.express.use(path, routes)
    }
}

export default ExpressApplication;