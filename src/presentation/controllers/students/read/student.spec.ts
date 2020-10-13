import { StudentController } from './students'
import { emptyResponse, serverError } from '@presentation/helpers/http/http-helper'
import { StudentModel } from '@domain/models/student/student'
import { IReadStudents } from '@domain/use-cases/student/read-student'

interface SutTypes { 
  listStudentSut:IReadStudents
  sut:StudentController
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

const makeSut = ():SutTypes => {
  const listStudentSut = new ReadStudentStub()
  const sut = new StudentController(listStudentSut)

  return { 
    listStudentSut,
    sut
  } 
}

const makeRequest = () => ({
  params: {
    id: 1
  }
})

describe('=== Student Controller ===', () => {
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
  it('Should expected to call with correct values', async () => {
    const { listStudentSut, sut } = makeSut()

    const params = jest.spyOn(listStudentSut, 'read')
    await sut.handle(makeRequest())
    expect(params).toBeCalledWith(1)
  })
  it('Should expected return one Student array', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.id).toBeTruthy()
    expect(httpResponse.body.name).toBeTruthy()
  })
})
