import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { UsersPayments } from '@infra/db/mysql/typeorm/entities/users-payments'
import { Connection, getRepository } from 'typeorm'
import app from '@main/config/app'
import request from 'supertest'

let connection: Connection
let user, plan, Payment

describe('User Payments Routes', () => {
  beforeEach(async () => {
    connection = await createConnection('medina_test')
    await connection.query('delete from users')
    await connection.query('delete from plans')
    await connection.query('delete from users_payments')
    user = await getRepository(Users).create({
      name: 'new-account',
      email: 'userPayments@gmail.com',
      password: 'validPass',
      age: 18
    }).save()
    plan = await getRepository(Plans).create({
      name: 'validPlan',
      price: 99,
      duration: 15
    }).save()
  })
  afterAll(async () => {
    await connection.close()
  })
  
  test('Should return an User Payment on success', async () => {
    const payload = {
      userId: user.id,
      planId: plan.id,
      paymentType: 'boleto',
      paymentValue: 69.99,
      paymentDate: new Date()
    }
    const response = await request(app).post('/api/user-payment').send(payload)
    expect(response.statusCode).toBe(200)
  })
})

describe('User Payments List routes', () => {
  beforeEach(async () => {
    connection = await createConnection('medina_test')
  })
  afterAll(async () => {
    await connection.close()
  })
  test('Should return an User Payment on success', async () => {
    const response = await request(app).get('/api/user-payment').send()
    expect(response.statusCode).toBe(200)
  })
})

describe('User Payments Update routes', () => {
  beforeEach(async () => {
    connection = await createConnection('medina_test')
    const userPayment = new UsersPayments()
    userPayment.user = user
    userPayment.plan = plan 
    userPayment.payment_type = 'boleto'
    userPayment.payment_value = 99.99
    userPayment.payment_date = new Date()

    Payment = getRepository(UsersPayments).save(userPayment)
  })
  afterAll(async () => {
    await connection.close()
  })
  test('Should return an User Payment on success', async () => {
    const payload = {
      userId: user.id,
      planId: plan.id,
      paymentType: 'cartão',
      paymentValue: 89.99,
      paymentDate: new Date()
    }
    const response = await request(app).put(`/api/user-payment/${Payment.id}`).send(payload)
    expect(response.statusCode).toBe(200)
  })
})
