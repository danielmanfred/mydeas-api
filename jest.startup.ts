import { Category } from './categories/categories.model';
import * as jestCli from 'jest-cli'
import { Project } from './projects/projects.model'
import { projectRouter } from './projects/projects.router'
import { environment } from './common/environment'
import { Server } from './server/server'
import { User } from './users/users.model'
import { userRouter } from './users/users.router'

let server: Server

const beforeAllTests = () => {
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/mydeas-test'
    environment.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([userRouter, projectRouter])
                 .then(() => User.remove({}).exec())
                 .then(() => {
                     let admin = new User()
                     admin.name = 'admin'
                     admin.email = 'admin@gmail.com'
                     admin.password = 'nimda'
                     admin.profiles = ['admin', 'user']
                     return admin.save()
                 })
                 .then(() => Project.remove({}).exec())
                 .then(() => Category.remove({}).exec())
}

const afterAllTests = () => {
    return server.shutdown()
}

beforeAllTests().then(() => jestCli.run())
                .then(() => afterAllTests())
                .catch(console.error)