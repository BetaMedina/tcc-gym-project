import { UpdateStudents } from './update-student'
import { IUpdateStudentRepository } from '@data/protocols/students/update-student'
import { IStudentUpdatePayload } from '@domain/use-cases/student/update-student'

interface SutTypes { 
  updateStudentSut:IUpdateStudentRepository
  sut:UpdateStudents
}

class UpdateStudentRepositoryStub implements IUpdateStudentRepository {
  async updateRows (id:number, payload:IStudentUpdatePayload):Promise<boolean> {
    return true
  }
}

const makeSut = ():SutTypes => {
  const updateStudentSut = new UpdateStudentRepositoryStub()
  const sut = new UpdateStudents(updateStudentSut)

  return { 
    updateStudentSut,
    sut
  } 
}
const makeRequest = () => ({
  id: 1,
  body: {
    name: 'validName',
    email: 'validMail',
    age: 21,
    height: 175,
    weigth: 70
  }
})

describe('=== List Student Use Case ===', () => {
  it('Should expected to throw a new error if List throw', async () => {
    const { updateStudentSut, sut } = makeSut()

    jest.spyOn(updateStudentSut, 'updateRows').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    expect(sut.update(makeRequest().id, makeRequest().body)).rejects.toThrow()
  })

  it('Should expected return boolean', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.update(makeRequest().id, makeRequest().body)
    expect(httpResponse).toEqual(true)
  })
})
