import * as restify from 'restify'
import {ModelRouter} from '../common/model-router'
import {User} from './users.model'
import {NotFoundError} from 'restify-errors'

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
                .then(this.renderAll(res, next))
                .catch(next)
        }
        else {
            next()
        }
    }

    applyRoutes(application: restify.Server) {

        application.get('/', this.respond)
        application.get({path: `${this.basePath}`, version: '2.0.0'}, [this.findByEmail, this.findAll])
        //application.get({path: '/users', version: '1.0.0'}, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validadeId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [this.validadeId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validadeId, this.update])
        application.del(`${this.basePath}/:id`, [this.validadeId, this.delete])
    }
}

export const userRouter = new UserRouter()