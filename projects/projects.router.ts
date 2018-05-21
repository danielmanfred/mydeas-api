import * as restify from 'restify'
import * as mongoose from 'mongoose'
import {ModelRouter} from '../common/model-router'
import {Hotel} from './hotels.model'
import { NotFoundError } from 'restify-errors';

class HotelRouter extends ModelRouter<Hotel> {
    constructor() {
        super(Hotel)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Hotel,Hotel>): mongoose.DocumentQuery<Hotel,Hotel> {
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
        application.get('/hotels', this.findAll)
        application.get('/hotels/:id', [this.validadeId, this.findById])
        application.post('/hotels', this.save)
        application.put('/hotels/:id', [this.validadeId, this.replace])
        application.patch('/hotels/:id', [this.validadeId, this.update])
        application.del('/hotels/:id', [this.validadeId, this.delete])

        //application.get('/hotels/:id/bookingChannel', [this.validadeId, this.findBookingChannel])
        //application.put('/hotels/:id/bookingChannel', [this.validadeId, this.replaceBookingChannel])
    }
}

export const hotelRouter = new HotelRouter()