import { DbLoadAccountByToken } from './load-account-token'
import { LoadAccountByIdRepository } from '@data/protocols/account/load-account-by-id'
import { Decrypter } from '@data/protocols/encrypter/decrypt'
import { UserAccount } from '@domain/models/account/use-account'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSut: Decrypter
  loadAccountByTokenRepositorySpy: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  class DecrypterStub implements Decrypter {
    decrypt (ciphertext: string):any {
      return { id: 1 }
    }
  }
  class LoadAccountByTokenStub implements LoadAccountByIdRepository {
    async loadById (id: number):Promise<UserAccount> {
      return {
        id: 1,
        name: 'validName',
        email: 'validMail',
        password: 'validPass',
        isAdmin: false 
      }
    }
  }
  const decrypterSut = new DecrypterStub()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenStub()
  const sut = new DbLoadAccountByToken(decrypterSut, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSut,
    loadAccountByTokenRepositorySpy
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterSut } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterSut, 'decrypt') 
    await sut.load('hashPass')
    expect(decrypterSpy).toBeCalledWith('hashPass')
  })
  it('Should call Decrypter and receveid null', async () => {
    const { sut, decrypterSut } = makeSut()
    jest.spyOn(decrypterSut, 'decrypt').mockReturnValue(null) 
    const response = await sut.load('hashPass')
    expect(response).toBe(null)
  })
  it('Should receveid throw from decrypter', async () => {
    const { sut, decrypterSut } = makeSut()
    jest.spyOn(decrypterSut, 'decrypt').mockImplementationOnce(() => { throw new Error() }) 
    const response = await sut.load('hashPass')
    expect(response).toBe(null)
  })
  it('Should receveid throw from loadById', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadById').mockImplementationOnce(() => { throw new Error() }) 
    const response = await sut.load('hashPass')
    expect(response).toBe(null)
  })
  it('Should receveid user model', async () => {
    const { sut } = makeSut()
    const response = await sut.load('hashPass')
    expect(response.id).toBeTruthy()
    expect(response.name).toBeTruthy()
    expect(response.password).toBeTruthy()
    expect(response.email).toBeTruthy()
  })
})
