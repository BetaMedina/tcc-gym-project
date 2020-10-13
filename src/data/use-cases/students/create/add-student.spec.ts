import { ICreateStudentRepository } from '@data/protocols/students/create-student'
import { StudentModel } from '@domain/models/student/student'
import { IStudentPayload } from '@domain/use-cases/student/create-student'
import { CreateStudent } from './add-student'

interface SutTypes{
  addStudentSut:ICreateStudentRepository
  sut:CreateStudent
}

const makeSut = ():SutTypes => {
  class AddStudentRepositoryStub implements ICreateStudentRepository {
    async createRow (payload:IStudentPayload):Promise<StudentModel> {
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
  const addStudentSut = new AddStudentRepositoryStub()
  const sut = new CreateStudent(addStudentSut)
  return {
    addStudentSut,
    sut
  }
}

const makeRequest = () => ({
  name: 'validName',
  email: 'validMail',
  age: 21,
  height: 175,
  weigth: 70
})

describe('=== Add Student ===', () => {
  it('Should expected to receveid correct parameters', async () => {
    const { addStudentSut, sut } = makeSut()
    const spyPlan = jest.spyOn(addStudentSut, 'createRow')

    await sut.create(makeRequest())
    expect(spyPlan).toHaveBeenCalledWith(makeRequest())
  })

  it('Should expected to throw if repository throws', async () => {
    const { addStudentSut, sut } = makeSut()
    jest.spyOn(addStudentSut, 'createRow').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    expect(sut.create(makeRequest())).rejects.toThrow()
  })

  it('Should expected to return success', async () => {
    const { sut } = makeSut()

    const response = await sut.create(makeRequest())
    expect(response).toEqual({
      id: 1,
      name: 'validName',
      email: 'validMail',
      age: 21,
      height: 175,
      weigth: 70
    })
  })
})
