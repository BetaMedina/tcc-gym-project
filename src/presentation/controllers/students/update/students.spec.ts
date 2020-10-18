import { StudentController } from './students'
import { badRequest, emptyResponse, serverError } from '@presentation/helpers/http/http-helper'
import { StudentModel } from '@domain/models/student/student'
import { IReadStudents } from '@domain/use-cases/student/read-student'
import { IUpdateStudents } from '@domain/use-cases/student/update-student'
import { InvalidParamError, ServerError, UnauthorizedError } from '@presentation/errors'
import { ValidatorStub } from '@presentation/tests'

interface SutTypes { 
  listStudentSut:IReadStudents
  sut:StudentController
  updateStudentSut:IUpdateStudents
  validatorSut:ValidatorStub
}

export class ReadStudentStub implements IReadStudents {
  async read ():Promise<StudentModel> {
    return {
      id: 1,
      name: 'validName',
      email: 'validMail',
      age: 21,
      height: 175,
      weigth: 70
    }
  }
}

export class UpdateStudentStub implements IUpdateStudents {
  async update ():Promise<boolean> {
    return true
  }
}

const makeSut = ():SutTypes => {
  const validatorSut = new ValidatorStub()
  const listStudentSut = new ReadStudentStub()
  const updateStudentSut = new UpdateStudentStub()
  const sut = new StudentController(validatorSut, listStudentSut, updateStudentSut)

  return { 
    validatorSut,
    listStudentSut,
    sut,
    updateStudentSut
  } 
}

const makeRequest = () => ({
  params: {
    id: 1
  },
  body: {
    name: 'validName',
    email: 'validMail',
    age: 21,
    height: 175,
    weigth: 70
  }
})

describe('=== Student Controller ===', () => {
  it('Should return error if name not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = makeRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('name'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('name')))
  })
  it('Should return error if email not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = makeRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('email'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  it('Should return error if age not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = makeRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('age'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('age')))
  })
  it('Should return error if height not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = makeRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('height'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('height')))
  })
  it('Should return error if weigth not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = makeRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('weigth'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('weigth')))
  })
  it('Should expected to throw a new error if List All Students throw', async () => {
    const { listStudentSut, sut } = makeSut()

    jest.spyOn(listStudentSut, 'read').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
  it('Should expected to throw a new error if List All Student throw', async () => {
    const { listStudentSut, sut } = makeSut()

    jest.spyOn(listStudentSut, 'read').mockReturnValue(null)
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(emptyResponse())
    expect(httpResponse.statusCode).toBe(204)
  })
  it('Should expected to return invalid operation', async () => {
    const { updateStudentSut, sut } = makeSut()

    jest.spyOn(updateStudentSut, 'update').mockReturnValue(null)
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })
  it('Should expected throw if update throws', async () => {
    const { updateStudentSut, sut } = makeSut()

    jest.spyOn(updateStudentSut, 'update').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any_error'))
  })
  it('Should expected throw if update throws', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toEqual(200)
  })
})
