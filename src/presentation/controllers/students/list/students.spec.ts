import { StudentController } from './students'
import { emptyResponse, serverError } from '@presentation/helpers/http/http-helper'
import { IListStudents } from '@domain/use-cases/student/list-student'
import { StudentModel } from '@domain/models/student/student'

interface SutTypes { 
  listStudentSut:IListStudents
  sut:StudentController
}

export class ListStudentStub implements IListStudents {
  async list ():Promise<StudentModel[]> {
    return [{
      id: 1,
      name: 'validName',
      email: 'validMail',
      age: 21,
      height: 175,
      weigth: 70
    }]
  }
}

const makeSut = ():SutTypes => {
  const listStudentSut = new ListStudentStub()
  const sut = new StudentController(listStudentSut)

  return { 
    listStudentSut,
    sut
  } 
}

describe('=== Student Controller ===', () => {
  it('Should expected to throw a new error if List All Students throw', async () => {
    const { listStudentSut, sut } = makeSut()

    jest.spyOn(listStudentSut, 'list').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
  it('Should expected to throw a new error if List All Student throw', async () => {
    const { listStudentSut, sut } = makeSut()

    jest.spyOn(listStudentSut, 'list').mockReturnValue(null)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(emptyResponse())
    expect(httpResponse.statusCode).toBe(204)
  })
  it('Should expected return one Student array', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body[0].id).toBeTruthy()
    expect(httpResponse.body[0].name).toBeTruthy()
  })
})
