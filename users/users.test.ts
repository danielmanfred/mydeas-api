import 'jest'
import * as request from 'supertest'
import { environment } from './../common/environment'
import { Server } from './../server/server'
import { User } from './users.model'
import { userRouter } from './users.router'

let address: string
let server: Server

beforeAll(() => {
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/mydeas-test'
    environment.server.port = process.env.SERVER_PORT || 3001
    address = `http://localhost:${environment.server.port}`
    server = new Server()
    return server.bootstrap([userRouter])
                 .then(() => User.remove({}).exec())
                 .catch(console.error)
})

test('get /users', () => {
    return request(address)
                .get('/users')
                .then(response => {
                    expect(response.status).toBe(200)
                    expect(response.body.items).toBeInstanceOf(Array)
                }).catch(fail)
})

test('post /users', () => {
    return request(address)
                .post('/users')
                .send({
                    name: 'usuario3',
                    email: 'usuario3@email.com',
                    password: 'senha3',
                    gender: 'M'
                })
                .then(response => {
                    expect(response.status).toBe(200)
                    expect(response.body._id).toBeDefined()
                    expect(response.body.name).toBe('usuario3')
                    expect(response.body.email).toBe('usuario3@email.com')
                    expect(response.body.password).toBeUndefined()
                    expect(response.body.gender).toBe('M')
                }).catch(fail)
})

test('get /users/aaa - not found', () => {
    return request(address)
                .get('/users/aaa')
                .then(response => {
                    expect(response.status).toBe(404)
                }).catch(fail)
})

test('patch /users/:id', () => {
    
})

afterAll(() => {
    return server.shutdown()
})