import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'
import app from '@main/config/app'
import request from 'supertest'
import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'
import { getRepository } from 'typeorm'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { UsersPlans } from '@infra/db/mysql/typeorm/entities/users-plans-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'

let connection, student, plan, token

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

describe('User Plans Routes', () => {
  beforeAll(async () => {
    connection = await createConnection('medina_test')
  })
  beforeEach(async () => {
    await connection.query('DELETE FROM users_plans')
    await connection.query('DELETE FROM students')
    student = await getRepository(Students).create({
      name: 'new-account',
      email: 'userPayments@gmail.com',
      weigth: 99,
      age: 18,
      height: 188
    }).save()
    plan = await getRepository(Plans).create({
      name: 'new-account',
      duration: 3,
      price: 99
    }).save()
    token = await makeJwtToken()
  })
  afterAll(async () => {
    await connection.close()
  })
  
  test('Should return an account on success', async () => {
    // const usersRepository = getRepository(model aqui);
    const payload = {
      studentId: student.id,
      planId: plan.id
    }
    const response = await request(app).post('/api/user-plans').set({ 'x-access-token': token }).send(payload)
    expect(response.statusCode).toBe(200)
  })
  test('Should return an list on success', async () => {
    // const usersRepository = getRepository(model aqui);
    const student = await getRepository(Students).create({
      name: 'new-account',
      email: 'user-new-test-2@gmail.com',
      weigth: 99,
      age: 18,
      height: 188
    }).save()
    const plan = await getRepository(Plans).create({
      name: 'new-account',
      duration: 3,
      price: 99
    }).save()

    await getRepository(UsersPlans).create({
      plan: plan,
      student: student
    }).save()
    const response = await request(app).get('/api/user-plans').set({ 'x-access-token': token }).send()
    expect(response.statusCode).toBe(200)
    expect(response.body[0].student).toBeInstanceOf(Object)
    expect(response.body[0].plan).toBeInstanceOf(Object)
  })

  test('Should update an user plan on success', async () => {
    const userPlan = await getRepository(UsersPlans).create({
      plan: plan,
      student: student
    }).save()

    const payload = {
      id: userPlan.id,
      studentId: student.id,
      planId: plan.id,
      startDate: new Date()
    }

    const response = await request(app).put('/api/user-plans').set({ 'x-access-token': token }).send(payload)
    expect(response.statusCode).toBe(200)
    expect(response.body.student).toBeInstanceOf(Object)
    expect(response.body.plan).toBeInstanceOf(Object)
  })
  test('Should read an user plan on success', async () => {
    const student = await getRepository(Students).create({
      name: 'new-account',
      email: 'user-new-test-6@gmail.com',
      weigth: 99,
      age: 18,
      height: 188
    }).save()
    const plan = await getRepository(Plans).create({
      name: 'test-plan',
      duration: 3,
      price: 99
    }).save()

    const userPlan = await getRepository(UsersPlans).create({
      plan: plan,
      student: student
    }).save()

    const response = await request(app).get(`/api/user-plans/${userPlan.id}`).set({ 'x-access-token': token }).send()

    expect(response.statusCode).toBe(200)
    expect(response.body.student).toBeInstanceOf(Object)
    expect(response.body.plan.name).toEqual('test-plan')
    expect(response.body.student.name).toEqual('new-account')
  })
  test('Should delete an user plan on success', async () => {
    const student = await getRepository(Students).create({
      name: 'new-account',
      email: 'user-new-test-6@gmail.com',
      weigth: 99,
      age: 18,
      height: 188
    }).save()
    const plan = await getRepository(Plans).create({
      name: 'new-account',
      duration: 3,
      price: 99
    }).save()

    const userPlan = await getRepository(UsersPlans).create({
      plan: plan,
      student: student
    }).save()

    const response = await request(app).delete(`/api/user-plans/${userPlan.id}`).set({ 'x-access-token': token }).send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual('User plan has been deleted')
  })
})
