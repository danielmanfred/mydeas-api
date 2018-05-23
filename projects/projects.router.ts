import { Project } from './projects.model';
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import {ModelRouter} from '../common/model-router'
import { NotFoundError } from 'restify-errors';

class ProjectRouter extends ModelRouter<Project> {
    constructor() {
        super(Project)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Project,Project>): mongoose.DocumentQuery<Project,Project> {
        return query //.populate('owner', 'name')
    }


    /*findBookingChannel = (req, res, next) => {
        Hotel.findById(req.params.id, '+bookingChannel').then(hotel => {
            if (!hotel) {
                throw new NotFoundError('Hotel not found')
            }
            else {
                res.json(hotel.bookingChannel)
                return next()
            }
        }).catch(next)
    }

    replaceBookingChannel = (req, res, next) => {
        Hotel.findById(req.params.id).then(hotel => {
            if (!hotel) {
                throw new NotFoundError('Hotel not found')
            }
            else {
                hotel.bookingChannel = req.body
                return hotel.save()
            }
        }).then(hotel => {
            res.json(hotel.bookingChannel)
            return next()
        }).catch(next)
    }*/

    applyRoutes(application: restify.Server) {
        application.get('/projects', this.findAll)
        application.get('/projects/:id', [this.validadeId, this.findById])
        application.post('/projects', this.save)
        application.put('/projects/:id', [this.validadeId, this.replace])
        application.patch('/projects/:id', [this.validadeId, this.update])
        application.del('/projects/:id', [this.validadeId, this.delete])

        //application.get('/hotels/:id/bookingChannel', [this.validadeId, this.findBookingChannel])
        //application.put('/hotels/:id/bookingChannel', [this.validadeId, this.replaceBookingChannel])
    }
}

export const projectRouter = new ProjectRouter()