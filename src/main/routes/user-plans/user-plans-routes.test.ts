import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'
import bcrypt from 'bcrypt'
import app from '@main/config/app'
import request from 'supertest'

let connection 

describe('User Plans Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })
  beforeEach(async () => {
    const password = await bcrypt.hash('any_password', 10)
    await connection.query('DELETE FROM plans')
    await connection.query('DELETE FROM users')
    await connection.query('DELETE FROM users_plans')
    await connection.query(`INSERT INTO users (id,name,createdAt,  
    updatedAt, 
    email,
    password
    ) VALUES (1,'users-plans',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'users-plans@test.com','${password}')`)
    await connection.query('INSERT INTO plans (id,name,price,duration,createdAt,updatedAt) VALUES (1,\'test-plan\',89,\'15 dias\',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)')
  })
  afterAll(async () => {
    await connection.close()
  })
  
  test('Should return an account on success', async () => {
    // const usersRepository = getRepository(model aqui);
    const payload = {
      userId: 1,
      planId: 1
    }
    const response = await request(app).post('/api/user-plans').send(payload)

    expect(response.statusCode).toBe(200)
  })
  test('Should return an list on success', async () => {
    // const usersRepository = getRepository(model aqui);
    await connection.query('INSERT INTO users_plans (id,createdAt,updatedAt,userId,planId) VALUES (2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,1,1)')

    const response = await request(app).get('/api/user-plans').send()
    expect(response.statusCode).toBe(200)
    expect(response.body[0].user).toBeInstanceOf(Object)
    expect(response.body[0].plan).toBeInstanceOf(Object)
  })
})
