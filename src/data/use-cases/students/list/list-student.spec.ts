import { ListStudent } from './list-student'
import { StudentModel } from '@domain/models/student/student'
import { IListStudentRepository } from '@data/protocols/students/list-student'

interface SutTypes { 
  listStudentSut:IListStudentRepository
  sut:ListStudent
}

const makeSut = ():SutTypes => {
  class ListStudentRepositoryStub implements IListStudentRepository {
    async listRows ():Promise<StudentModel[]> {
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
  const listStudentSut = new ListStudentRepositoryStub()
  const sut = new ListStudent(listStudentSut)

  return { 
    listStudentSut,
    sut
  } 
}

describe('=== List Student Use Case ===', () => {
  it('Should expected to throw a new error if List throw', async () => {
    const { listStudentSut, sut } = makeSut()

    jest.spyOn(listStudentSut, 'listRows').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    expect(sut.list()).rejects.toThrow()
  })

  it('Should expected return array', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.list()
    expect(httpResponse).toEqual([{
      id: 1,
      name: 'validName',
      email: 'validMail',
      age: 21,
      height: 175,
      weigth: 70
    }])
  })
})
