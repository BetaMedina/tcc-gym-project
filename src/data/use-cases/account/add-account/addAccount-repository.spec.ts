import { DbAddAccount } from './addAccount-data'
import { AddAccountReceived } from '@data/protocols/account/add-account'
import { AddAccountRepository } from '@domain/use-cases/add-account-db'
import { UserAccount } from '@domain/models/use-account'
import { Encrypter } from '@data/protocols/encrypter/encrypt'

interface SutTypes {
  sut:DbAddAccount
  addAccountReposityStub:AddAccountRepository
  encryptSut:Encrypter
}

const makeSut = ():SutTypes => {
  class Hash implements Encrypter {
    encrypt (plaintext: string):Promise<string> {
      return new Promise(resolve => resolve('hashpassword'))
    }
  }

  class AddAccountReposityStub implements AddAccountRepository {
    async createRow (accountData:AddAccountReceived):Promise<UserAccount> {
      const fakeAccount = {
        id: 1,
        name: 'validName',
        email: 'validMail',
        password: 'hashedValue'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  const addAccountReposityStub = new AddAccountReposityStub()
  const encryptSut = new Hash()
  const sut = new DbAddAccount(addAccountReposityStub, encryptSut)
  return {
    sut,
    encryptSut,
    addAccountReposityStub
  }
}

describe('DbAddAccount UseCase', () => {
  it('Should call addAccountRepositorie with correct password ', async () => {
    const { addAccountReposityStub, sut } = makeSut()
    const createSpy = jest.spyOn(addAccountReposityStub, 'createRow')
    const accountData = {
      name: 'validName',
      email: 'validMail',
      password: 'validPassword'
    }
    await sut.create(accountData)
    expect(createSpy).toHaveBeenCalledWith({
      ...accountData,
      password: 'hashpassword'

    })
  })
  it('Should throw if addAccountRepositorie throws ', async () => {
    const { addAccountReposityStub, sut } = makeSut()
    jest.spyOn(addAccountReposityStub, 'createRow').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'validName',
      email: 'validMail',
      password: 'validPassword'
    }
    expect(sut.create(accountData)
    ).rejects.toThrow()
  })

  it('Should throw if Hash throws ', async () => {
    const { sut, encryptSut } = makeSut()
    jest.spyOn(encryptSut, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'validName',
      email: 'validMail',
      password: 'validPassword'
    }
    expect(sut.create(accountData)
    ).rejects.toThrow()
  })
  
  it('Should hash if correct values ', async () => {
    const { sut, encryptSut } = makeSut()
    const spyHash = jest.spyOn(encryptSut, 'encrypt')
    const accountData = {
      name: 'validName',
      email: 'validMail',
      password: 'validPassword'
    }
    await sut.create(accountData)
    expect(spyHash).toBeCalledWith('validPassword')
  })

  it('Should return and account on success ', async () => {
    const { addAccountReposityStub, sut } = makeSut()
    const accountData = {
      name: 'validName',
      email: 'validMail',
      password: 'validPassword'
    }
    const account = await sut.create(accountData)
    expect(account).toEqual({
      id: 1,
      name: 'validName',
      email: 'validMail',
      password: 'hashedValue'
    })
  })
})
