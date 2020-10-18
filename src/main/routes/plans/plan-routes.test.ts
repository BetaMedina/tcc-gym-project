import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'

let connection: Connection
let token

const makeJwtToken = async () => {
  const user = await getRepository(Users).create({
    name: 'planUser',
    age: 22,
    email: 'planuserTest@admin.com',
    isAdmin: true,
    password: 'hashPassword'
  })
  const jwtAdapter = new JsonWebTokenAdapter()
  return jwtAdapter.hashGenerate(user.id, true)
}

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection('medina_test')
    await connection.query('DELETE FROM plans')

    token = await makeJwtToken()
  })
  afterAll(async () => {
    await connection.query('DELETE FROM plans')
    await connection.close()
  })
  
  test('Should expected to create a new Plan', async () => {
    const payload = {
      name: 'plan diamond',
      price: 79.99,
      duration: 15
    }
    const response = await request(app).post('/api/plan').set({ 'x-access-token': token }).send(payload)
    expect(response.statusCode).toBe(200)
  })
  test('Should expected to return a new Plan', async () => {
    const payload = {
      name: 'plan diamond',
      price: 79.99,
      duration: 15
    }
    const response = await request(app).get('/api/plan').set({ 'x-access-token': token }).send(payload)
    expect(response.statusCode).toBe(200)
    expect(response.body[0].name).toEqual('plan diamond')
    expect(response.body[0].price).toEqual(79.99)
    expect(response.body[0].duration).toEqual(15)
  })
  test('Should expected to return a new Plan', async () => {
    const payload = {
      name: 'plan silver',
      price: 79.99,
      duration: 15
    }
    const response = await request(app).put('/api/plan').set({ 'x-access-token': token }).send(payload)
    expect(response.statusCode).toBe(200)
  })
  test('Should expected to return a new Plan', async () => {
    const plan = await getRepository(Plans).create({
      name: 'plan gold',
      price: 99.99,
      duration: 15
    }).save()
    const response = await request(app).get(`/api/plan/${plan.id}`).set({ 'x-access-token': token }).send()
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('plan gold')
    expect(response.body.price).toEqual(99.99)
    expect(response.body.duration).toEqual(15)
  })
  test('Should expected to return a new Plan', async () => {
    const plan = await getRepository(Plans).create({
      name: 'plan gold',
      price: 99.99,
      duration: 15
    }).save()
    const response = await request(app).delete(`/api/plan/${plan.id}`).set({ 'x-access-token': token }).send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual('Plan has been deleted')
  })
})
