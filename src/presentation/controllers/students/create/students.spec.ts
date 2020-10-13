import { StudentModel } from '@domain/models/student/student'
import { ICreateStudent, IStudentPayload } from '@domain/use-cases/student/create-student'
import { InvalidParamError, ServerError } from '@presentation/errors'
import { badRequest, serverError } from '@presentation/helpers/http/http-helper'
import { ValidatorStub } from '@presentation/tests'
import { Students } from './students'

interface ISutTypes{
  validatorSut:ValidatorStub
  sut:Students
  createStudentSut:ICreateStudent
}

class CreateStudentStub implements ICreateStudent {
  async create (payload:IStudentPayload):Promise<StudentModel> {
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

const makeSut = ():ISutTypes => {
  const validatorSut = new ValidatorStub()
  const createStudentSut = new CreateStudentStub()
  const sut = new Students(validatorSut, createStudentSut)
  return {
    sut,
    validatorSut,
    createStudentSut
  }
}

const mockRequest = () => ({
  body: {
    name: 'validName',
    email: 'validMail',
    age: 21,
    height: 175,
    weigth: 70
  }
})

describe('=== Students Create ===', () => {
  it('Should return error if name not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = mockRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('name'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('name')))
  })
  it('Should return error if email not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = mockRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('email'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  it('Should return error if age not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = mockRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('age'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('age')))
  })
  it('Should return error if height not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = mockRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('height'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('height')))
  })
  it('Should return error if weigth not pass', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = mockRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('weigth'))
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('weigth')))
  })
  it('Should server error if create student throws', async () => {
    const { sut, createStudentSut } = makeSut()
    const payload = mockRequest()

    jest.spyOn(createStudentSut, 'create').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(payload)

    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })
  it('Should return success on user has been created', async () => {
    const { sut } = makeSut()
    const payload = mockRequest()

    const httpResponse = await sut.handle(payload)

    expect(httpResponse.statusCode).toEqual(200)
  })
})
