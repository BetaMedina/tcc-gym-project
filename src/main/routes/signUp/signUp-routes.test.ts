import request from 'supertest'
import { Connection, getConnection } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'

let connection: Connection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })
  beforeEach(async () => {
    await connection.query('DELETE FROM users')
  })
  
  afterAll(async () => {
    await connection.close()
  })
  
  test('Should return an account on success', async () => {
    const payload = {
      name: 'validName',
      email: 'notvalid@email.com',
      password: 'validPassword',
      age: 18,
      passwordConfirm: 'validPassword'

    }
    const response = await request(app).post('/api/signup').send(payload)
    expect(response.statusCode).toBe(200)
  })
})
