import { DbLoadAccountById } from './load-account-id'
import { ILoadStudentByIdRepository } from '@data/protocols/students/load-account-by-id'
import { StudentModel } from '@domain/models/student/student'

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByTokenRepositorySpy: ILoadStudentByIdRepository
}

const makeSut = (): SutTypes => {
  class LoadAccountByIdStub implements ILoadStudentByIdRepository {
    async loadById (id: number):Promise<StudentModel> {
      return {
        id: id,
        name: 'validName',
        email: 'validMail',
        age: 22,
        weigth: 99,
        height: 99
      }
    }
  }
  const loadAccountByTokenRepositorySpy = new LoadAccountByIdStub()
  const sut = new DbLoadAccountById(loadAccountByTokenRepositorySpy)
  return {
    sut,
    loadAccountByTokenRepositorySpy
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('Should receveid throw from loadById', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    expect(sut.load(1)).rejects.toThrow()
  })
  it('Should receveid user model', async () => {
    const { sut } = makeSut()
    const response = await sut.load(1)
    expect(response.id).toBeTruthy()
    expect(response.name).toBeTruthy()
    expect(response.email).toBeTruthy()
  })
})
