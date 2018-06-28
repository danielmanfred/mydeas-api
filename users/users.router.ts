import * as restify from 'restify'
import { ModelRouter } from '../common/model-router'
import { User } from './users.model'
import { NotFoundError } from 'restify-errors'
import { authenticate } from './../security/auth.handler'
import { authorize } from './../security/authz.handler'

class UserRouter extends ModelRouter<User> {

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    findByEmail = (req, res, next) => {
        if (req.query.email) {
            User.findByEmail(req.query.email)
                .then(user => user ? [user] : [])
                .then(this.renderAll(res, next, {
                    pageSize: this.pageSize,
                    url: req.url 
                }))
                .catch(next)
        }
        else {
            next()
        }
    }


    applyRoutes(application: restify.Server) {

        application.get('/', this.respond)
        application.get(`${this.basePath}`, [this.findByEmail, this.findAll])
        application.get(`${this.basePath}/:id`, [this.validadeId, this.findById])
        application.post(`${this.basePath}`, this.save)
        
        application.put(`${this.basePath}/:id`, [this.validadeId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validadeId, this.update])
        application.del(`${this.basePath}/:id`, [this.validadeId, this.delete])
        
        //application.put(`${this.basePath}/:id`, [authorize('user'), this.validadeId, this.replace])
        //application.patch(`${this.basePath}/:id`, [authorize('user'), this.validadeId, this.update])
        //application.del(`${this.basePath}/:id`, [authorize('admin', 'user'), this.validadeId, this.delete])

        application.post(`${this.basePath}/authenticate`, authenticate)
    }
}

export const userRouter = new UserRouter()