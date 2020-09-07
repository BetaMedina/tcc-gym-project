import request from 'supertest'
import { Connection } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'

let connection: Connection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection('medina_test')
    await connection.query('DELETE FROM plans')
  })
  afterAll(async () => {
    await connection.query('DELETE FROM plans')
    await connection.close()
  })
  
  test('Should return an token with success on success', async () => {
    const payload = {
      name: 'plan diamond',
      price: 79.99,
      duration: '15 dias'
    }
    const response = await request(app).post('/api/plan').send(payload)
    expect(response.statusCode).toBe(200)
  })
})
