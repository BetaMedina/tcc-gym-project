import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'

let connection: Connection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.query('DELETE FROM plans')
  })
  afterAll(async () => {
    await connection.query('DELETE FROM plans')
    await connection.close()
  })
  
  test('Should expected to create a new Plan', async () => {
    const payload = {
      name: 'plan diamond',
      price: 79.99,
      duration: '15 dias'
    }
    const response = await request(app).post('/api/plan').send(payload)
    expect(response.statusCode).toBe(200)
  })
  test('Should expected to return a new Plan', async () => {
    const payload = {
      name: 'plan diamond',
      price: 79.99,
      duration: '15 dias'
    }
    const response = await request(app).get('/api/plan').send(payload)
    expect(response.statusCode).toBe(200)
    expect(response.body[0].name).toEqual('plan diamond')
    expect(response.body[0].price).toEqual(79.99)
    expect(response.body[0].duration).toEqual('15 dias')
  })
  test('Should expected to return a new Plan', async () => {
    const payload = {
      name: 'plan silver',
      price: 79.99,
      duration: '15 dias'
    }
    const response = await request(app).put('/api/plan').send(payload)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('plan silver')
    expect(response.body.price).toEqual(79.99)
    expect(response.body.duration).toEqual('15 dias')
  })
  test('Should expected to return a new Plan', async () => {
    const plan = await getRepository(Plans).create({
      name: 'plan gold',
      price: 99.99,
      duration: '15 dias'
    }).save()
    const response = await request(app).get(`/api/plan/${plan.id}`).send()
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('plan gold')
    expect(response.body.price).toEqual(99.99)
    expect(response.body.duration).toEqual('15 dias')
  })
})
