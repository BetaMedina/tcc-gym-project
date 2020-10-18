import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

import app from '@main/config/app'
import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'

let connection: Connection
let token

const makeJwtToken = async () => {
  const user = await getRepository(Users).create({
    name: 'planUser',
    age: 22,
    email: 'studentsTest@admin.com',
    isAdmin: true,
    password: 'hashPassword'
  })
  const jwtAdapter = new JsonWebTokenAdapter()
  return jwtAdapter.hashGenerate(user.id, true)
}

describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await getRepository(Students).delete({})
    token = await makeJwtToken()
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
    const response = await request(app).post('/api/student').set({ 'x-access-token': token }).send(payload)
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

    const response = await request(app).get('/api/student').set({ 'x-access-token': token }).send()
    expect(response.statusCode).toBe(200)
  })
  test('Should expected to return all Students', async () => {
    const newStudent = await getRepository(Students).create({
      name: 'validName',
      email: 'test-3-students@mail.com',
      age: 19,
      height: 196,
      weigth: 80
    }).save()

    const response = await request(app).get(`/api/student/${newStudent.id}`).set({ 'x-access-token': token }).send()
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toEqual(newStudent.id)
  })
  test('Should expected to return all Students', async () => {
    const newStudent = await getRepository(Students).create({
      name: 'validName',
      email: 'test-4-students@mail.com',
      age: 19,
      height: 196,
      weigth: 80
    }).save()

    const payload = {
      name: 'validNameNew',
      email: 'test-4-students@mail.com',
      age: 19,
      height: 196,
      weigth: 80
    }

    const response = await request(app).put(`/api/student/${newStudent.id}`).set({ 'x-access-token': token }).send(payload)
    expect(response.statusCode).toBe(200)
  })
})
