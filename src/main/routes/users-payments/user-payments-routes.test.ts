import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import app from '@main/config/app'
import request from 'supertest'
import { Connection, getRepository } from 'typeorm'

let connection: Connection

describe('User Payments Routes', () => {
  beforeEach(async () => {
    connection = await createConnection('medina_test')
    await connection.query('delete from users')
    await connection.query('delete from plans')
    await connection.query('delete from users_payments')
  })
  it('Should return an User Payment on success', async () => {
    const user = await getRepository(Users).create({
      name: 'new-account',
      email: 'userPayments@gmail.com',
      password: 'validPass'
    }).save()
    const plan = await getRepository(Plans).create({
      name: 'validPlan',
      price: 99,
      duration: 'validDuration'
    }).save()

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
