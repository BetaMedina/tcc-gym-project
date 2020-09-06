import request from 'supertest'
import { Connection, getConnection } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'

let connection: Connection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })
  beforeEach(async () => {
    await connection.query('DELETE FROM users')
  })
  
  afterAll(async () => {
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })
  
  test('Should return an account on success', async () => {
    // const usersRepository = getRepository(model aqui);

    const payload = {
      name: 'validName',
      email: 'notvalid@email.com',
      password: 'validPassword',
      passwordConfirm: 'validPassword'

    }
    const response = await request(app).post('/api/signup').send(payload)
    expect(response.statusCode).toBe(200)
  })
})
