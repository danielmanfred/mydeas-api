"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_model_1 = require("./categories.model");
const model_router_1 = require("../common/model-router");
class CategoryRouter extends model_router_1.ModelRouter {
    constructor() {
        super(categories_model_1.Category);
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validadeId, this.findById]);
        application.post(`${this.basePath}`, [this.save]);
        application.put(`${this.basePath}/:id`, [this.validadeId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validadeId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validadeId, this.delete]);
        /* application.post(`${this.basePath}`, [authorize('admin'), this.save])
        application.put(`${this.basePath}/:id`, [authorize('admin'), this.validadeId, this.replace])
        application.patch(`${this.basePath}/:id`, [authorize('admin'), this.validadeId, this.update])
        application.del(`${this.basePath}/:id`, [authorize('admin'), this.validadeId, this.delete]) */
    }
}
exports.categoryRouter = new CategoryRouter();
