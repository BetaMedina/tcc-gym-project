import request from 'supertest'
import { Connection, getConnection, getRepository } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import bcrypt from 'bcrypt'

let connection: Connection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection('medina_test')
    await connection.query('DELETE FROM users')
    const password = await bcrypt.hash('any_password', 10)
    await getRepository(Users).create({
      name: 'new-account',
      email: 'account@gmail.com',
      password
    }).save()
  })
  afterAll(async () => {
    // await connection.query('DELETE FROM users')
    await connection.close()
  })
  
  test('Should return an token with success on success', async () => {
    const payload = {
      email: 'account@gmail.com',
      password: 'any_password'
    }
    const response = await request(app).post('/api/signin').send(payload)
    expect(response.statusCode).toBe(200)
  })
})
