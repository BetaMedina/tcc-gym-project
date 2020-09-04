import { DbAddAccount } from './addAccount-data'
import { AddAccountReceived } from '../protocols/add-account'
import { AddAccountRepository } from '../../domain/use-cases/add-account-db'
import { UserAccount } from '../../domain/models/use-account'

interface SutTypes {
  sut:DbAddAccount
  addAccountReposityStub:AddAccountRepository
}

const makeSut = ():SutTypes => {
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
  const sut = new DbAddAccount(addAccountReposityStub)

  return {
    sut,
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
      password: 'validPassword'

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
