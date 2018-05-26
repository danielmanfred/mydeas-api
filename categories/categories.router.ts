import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Category } from './categories.model'
import { ModelRouter } from '../common/model-router';

class CategoryRouter extends ModelRouter<Category> {
    constructor() {
        super(Category)
    }

    applyRoutes(application: restify.Server) {

        application.get('/categories', this.findAll)
        application.get('/categories/:id', [this.validadeId, this.findById])
        application.post('/categories', this.save)
        application.put('/categories/:id', [this.validadeId, this.replace])
        application.patch('/categories/:id', [this.validadeId, this.update])
        application.del('/categories/:id', [this.validadeId, this.delete])
    }
}

export const categoryRouter = new CategoryRouter()