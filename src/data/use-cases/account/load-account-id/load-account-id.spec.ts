import { DbLoadAccountById } from './load-account-id'
import { LoadAccountByIdRepository } from '@data/protocols/account/load-account-by-id'
import { UserAccount } from '@domain/models/account/use-account'

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByTokenRepositorySpy: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  class LoadAccountByIdStub implements LoadAccountByIdRepository {
    async loadById (id: number):Promise<UserAccount> {
      return {
        id: id,
        name: 'validName',
        email: 'validMail',
        password: 'validPass',
        isAdmin: false 
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
    expect(response.password).toBeTruthy()
    expect(response.email).toBeTruthy()
  })
})
