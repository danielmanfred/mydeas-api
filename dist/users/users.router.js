"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
const auth_handler_1 = require("./../security/auth.handler");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, res, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => user ? [user] : [])
                    .then(this.renderAll(res, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/', this.respond);
        application.get(`${this.basePath}`, [this.findByEmail, this.findAll]);
        application.get(`${this.basePath}/:id`, [this.validadeId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validadeId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validadeId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validadeId, this.delete]);
        //application.put(`${this.basePath}/:id`, [authorize('user'), this.validadeId, this.replace])
        //application.patch(`${this.basePath}/:id`, [authorize('user'), this.validadeId, this.update])
        //application.del(`${this.basePath}/:id`, [authorize('admin', 'user'), this.validadeId, this.delete])
        application.post(`${this.basePath}/authenticate`, auth_handler_1.authenticate);
    }
}
exports.userRouter = new UserRouter();
