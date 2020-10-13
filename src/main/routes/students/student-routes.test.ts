import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'
import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'

let connection: Connection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await getRepository(Students).delete({})
  })
  afterAll(async () => {
    await connection.close()
  })

  test('Should expected to create a new Student', async () => {
    const payload = {
      name: 'validName',
      email: 'validMail@mail.com',
      age: 19,
      height: 196,
      weigth: 80
    }
    const response = await request(app).post('/api/student').send(payload)
    expect(response.statusCode).toBe(200)
  })
  test('Should expected to return all Students', async () => {
    await getRepository(Students).create({
      name: 'validName',
      email: 'test-2-students@mail.com',
      age: 19,
      height: 196,
      weigth: 80
    }).save()

    const response = await request(app).get('/api/student').send()
    expect(response.statusCode).toBe(200)
  })
})
