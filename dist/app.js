"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _1 = require(".");
const dotenv_1 = require("dotenv");
const dotenv_expand_1 = require("dotenv-expand");
(0, dotenv_expand_1.expand)((0, dotenv_1.config)());
/**
 * The ExpressApplication class defines the `getInstance` method that lets clients access
 * the unique ExpressApplication instance.
 */
class ExpressApplication {
    /**
     * The ExpressApplication's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    constructor(port = '') {
        this.express = (0, express_1.default)();
        const cors = require('cors');
        const morgan = require('morgan');
        const { json, urlEncoded } = _1.parser;
        this.express.use(json);
        this.express.use(urlEncoded);
        this.express.use(cors());
        this.express.use(morgan("combined"));
        this.port = port;
    }
    /**
     * The static method that controls the access to the ExpressApplication instance.
     *
     * This implementation let you subclass the ExpressApplication class while keeping
     * just one instance of each subclass around.
     */
    static getInstance(port) {
        if (!ExpressApplication.instance) {
            ExpressApplication.instance = new ExpressApplication(port);
        }
        return ExpressApplication.instance;
    }
    /**
     * Starting express application
     */
    init() {
        this.express.listen(this.port, () => {
            console.log(`Express Server is listening on port ${this.port}`);
            console.log(`Express Server ready at: http://${process.env.API_URL}:${this.port}`);
        });
    }
    /**
     * Load router
     *
     * @param path
     * @param routes
     */
    useRouter(path, routes) {
        this.express.use(path, routes);
    }
}
exports.default = ExpressApplication;
