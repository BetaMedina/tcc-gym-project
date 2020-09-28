import request from 'supertest'
import { Connection } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'

let connection: Connection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection('medina_test')
    await connection.query('DELETE FROM users')
  })
  afterAll(async () => {
    await connection.query('DELETE FROM users')
    await connection.close()
  })
 
  test('Should expected to success response on delete user', async () => {
    await connection.query(`INSERT INTO users (id,name,createdAt,  
      updatedAt, 
      email,
      password
      ) VALUES (4,'users-plans',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'account-test@test.com','hashPassword')`)

    const response = await request(app).delete(`/api/account/${4}`).send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual('Account has been deleted')
  })
})
