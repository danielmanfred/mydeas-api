import { categoryRouter } from './categories/categories.router';
import {Server} from './server/server'
import {userRouter} from './users/users.router'
import {projectRouter} from './projects/projects.router'

const server = new Server()

server.bootstrap([userRouter, projectRouter, categoryRouter]).then(server => {
    console.log('Server is listening on: ', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
}) 