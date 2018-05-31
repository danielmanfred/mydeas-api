import 'jest'
import * as request from 'supertest'
import { environment } from './../common/environment'

const address: string = 'http://localhost:3001'

test('get /projects', () => {
    return request(address).get('/projects')
                           .then(response => {
                                
                           })
                           .catch(fail)
})