import 'jest'
import * as request from 'supertest'
import { Server} from '../server/server'

beforeAll(() => {

})

test('get /users', () => {
    return request('http://localhost:3000')
                .get('/users')
                .then(response => {
                    expect(response.status).toBe(200)
                    expect(response.body.items).toBeInstanceOf(Array)
                }).catch(fail)
})

test('post /users', () => {
    return request('http://localhost:3000')
                .post('/users')
                .send({
                    name: 'usuario1',
                    email: 'usuario1@email.com',
                    password: 'senha1',
                    gender: 'F'
                })
                .then(response => {
                    expect(response.status).toBe(200)
                    expect(response.body._id).toBeDefined()
                    expect(response.body.name).toBe('usuario1')
                    expect(response.body.email).toBe('usuario1@email.com')
                    expect(response.body.password).toBeUndefined()
                    expect(response.body.gender).toBe('F')
                }).catch(fail)
})