import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { UsersPayments } from '@infra/db/mysql/typeorm/entities/users-payments'
import { Connection, getRepository } from 'typeorm'
import app from '@main/config/app'
import request from 'supertest'
import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'

let connection: Connection
let student, plan, Payment, token

const makeJwtToken = async () => {
  const user = await getRepository(Users).create({
    name: 'planUser',
    age: 22,
    email: 'userPlanTest@admin.com',
    isAdmin: true,
    password: 'hashPassword'
  })
  const jwtAdapter = new JsonWebTokenAdapter()
  return jwtAdapter.hashGenerate(user.id, true)
}

describe('User Payments Routes', () => {
  beforeEach(async () => {
    connection = await createConnection('medina_test')
    await connection.query('delete from students')
    await connection.query('delete from plans')
    await connection.query('delete from users_payments')
    student = await getRepository(Students).create({
      name: 'new-account',
      email: 'userPayments@gmail.com',
      weigth: 88,
      age: 18,
      height: 188
    }).save()

    plan = await getRepository(Plans).create({
      name: 'validPlan',
      price: 99,
      duration: 15
    }).save()
    token = await makeJwtToken()
  })
  afterAll(async () => {
    await connection.close()
  })
  
  test('Should return an User Payment on success', async () => {
    const payload = {
      studentId: student.id,
      planId: plan.id,
      paymentType: 'boleto',
      paymentValue: 69.99,
      paymentDate: new Date()
    }
    const response = await request(app).post('/api/user-payment').set({ 'x-access-token': token }).send(payload)
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
    const response = await request(app).get('/api/user-payment').set({ 'x-access-token': token }).send()
    expect(response.statusCode).toBe(200)
  })
})

describe('User Payments Update routes', () => {
  beforeEach(async () => {
    connection = await createConnection('medina_test')
    const userPayment = new UsersPayments()
    userPayment.student = student
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
      studentId: student.id,
      planId: plan.id,
      paymentType: 'cartão',
      paymentValue: 89.99,
      paymentDate: new Date()
    }
    const response = await request(app).put(`/api/user-payment/${Payment.id}`).set({ 'x-access-token': token }).send(payload)
    expect(response.statusCode).toBe(200)
  })
})
