"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./../common/logger");
const restify = require("restify");
const mongoose = require("mongoose");
const fs = require("fs");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
const token_parser_1 = require("./../security/token.parser");
class Server {
    initalizeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url);
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                const options = {
                    name: 'mydeas-api',
                    version: '1.0.0',
                    log: logger_1.logger
                };
                if (environment_1.environment.security.enableHTTPS) {
                    options.certificate = fs.readFileSync(environment_1.environment.security.certificate),
                        options.key = fs.readFileSync(environment_1.environment.security.key);
                }
                this.application = restify.createServer(options);
                this.application.pre(restify.plugins.requestLogger({
                    log: logger_1.logger
                }));
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                this.application.use(token_parser_1.tokenParser);
                this.application.use(function (req, res, next) {
                    // Website you wish to allow to connect
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
                    // Request methods you wish to allow
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    // Request headers you wish to allow
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                    // Set to true if you need the website to include cookies in the requests sent
                    // to the API (e.g. in case you use sessions)
                    //res.setHeader('Access-Control-Allow-Credentials', true);
                    // Pass to next layer of middleware
                    next();
                });
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handler_1.handleError);
                // (req, res, route, error)
                /*this.application.on('after', restify.plugins.auditLogger({
                    log: logger,
                    event: 'after',
                    server: this.application
                }))

                this.application.on('audit', data => {

                })*/
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initalizeDb().then(() => this.initRoutes(routers).then(() => this));
    }
    shutdown() {
        return mongoose.disconnect().then(() => this.application.close());
    }
}
exports.Server = Server;
