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
            User.find({email: req.query.email}).then(this.renderAll(res, next)).catch(next)
        }
        else {
            next()
        }
    }

    applyRoutes(application: restify.Server) {

        application.get('/', this.respond)
        application.get({path: '/users', version: '2.0.0'}, [this.findByEmail, this.findAll])
        application.get({path: '/users', version: '1.0.0'}, this.findAll)
        application.get('/users/:id', [this.validadeId, this.findById])
        application.post('/users', this.save)
        application.put('/users/:id', [this.validadeId, this.replace])
        application.patch('/users/:id', [this.validadeId, this.update])
        application.del('/users/:id', [this.validadeId, this.delete])
    }
}

export const userRouter = new UserRouter()