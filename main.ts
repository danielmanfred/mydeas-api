import {Server} from './server/server'
import {guestRouter} from './guests/guests.router'
import {hotelRouter} from './hotels/hotels.router'

const server = new Server()

server.bootstrap([guestRouter, hotelRouter]).then(server => {
    console.log('Server is listening on: ', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
}) 