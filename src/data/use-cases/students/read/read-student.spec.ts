import { ReadStudents } from './read-student'
import { StudentModel } from '@domain/models/student/student'
import { IReadStudentRepository } from '@data/protocols/students/read-student'

interface SutTypes { 
  readStudentSut:IReadStudentRepository
  sut:ReadStudents
}

const makeSut = ():SutTypes => {
  class ReadStudentRepositoryStub implements IReadStudentRepository {
    async readRows ():Promise<StudentModel> {
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
  const readStudentSut = new ReadStudentRepositoryStub()
  const sut = new ReadStudents(readStudentSut)

  return { 
    readStudentSut,
    sut
  } 
}

const makeRequest = () => ({
  id: 1
})

describe('=== List Student Use Case ===', () => {
  it('Should expected to throw a new error if List throw', async () => {
    const { readStudentSut, sut } = makeSut()

    jest.spyOn(readStudentSut, 'readRows').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    expect(sut.read(makeRequest().id)).rejects.toThrow()
  })

  it('Should expected return array', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.read(makeRequest().id)
    expect(httpResponse).toEqual({
      id: 1,
      name: 'validName',
      email: 'validMail',
      age: 21,
      height: 175,
      weigth: 70
    })
  })
})
