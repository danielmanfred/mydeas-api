import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Category } from './categories.model'
import { ModelRouter } from '../common/model-router';

class CategoryRouter extends ModelRouter<Category> {
    constructor() {
        super(Category)
    }

    applyRoutes(application: restify.Server) {

        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validadeId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [this.validadeId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validadeId, this.update])
        application.del(`${this.basePath}/:id`, [this.validadeId, this.delete])
    }
}

export const categoryRouter = new CategoryRouter()