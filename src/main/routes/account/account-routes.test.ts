import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'
import app from '@main/config/app'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'

let connection: Connection
let token

const makeJwtToken = async () => {
  const user = await getRepository(Users).create({
    name: 'planUser',
    age: 22,
    email: 'userAccountTest@admin.com',
    isAdmin: true,
    password: 'hashPassword'
  })
  const jwtAdapter = new JsonWebTokenAdapter()
  return jwtAdapter.hashGenerate(user.id, true)
}

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection('medina_test')
    await connection.query('DELETE FROM users')
    token = await makeJwtToken()
  })
  afterAll(async () => {
    await connection.query('DELETE FROM users')
    await connection.close()
  })
 
  test('Should expected to success response on delete user', async () => {
    await connection.query(`INSERT INTO users (id,name,age,createdAt,  
      updatedAt, 
      email,
      password
      ) VALUES (4,'users-plans2',18,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'account-test@test.com','hashPassword')`)

    const response = await request(app).delete(`/api/account/${4}`).set({ 'x-access-token': token }).send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual('Account has been deleted')
  })
  test('Should expected to success response on delete user', async () => {
    await connection.query(`INSERT INTO users (id,name,age,createdAt,  
      updatedAt, 
      email,
      password
      ) VALUES (5,'users-plans',18,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'account-testsignup2@test.com','hashPassword')`)

    const response = await request(app).get('/api/accounts').set({ 'x-access-token': token }).send()
    expect(response.statusCode).toBe(200)
  })
})
