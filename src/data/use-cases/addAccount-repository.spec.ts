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
    async create (accountData:AddAccountReceived):Promise<UserAccount> {
      const fakeAccount = {
        id: 'validId',
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
    const createSpy = jest.spyOn(addAccountReposityStub, 'create')
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
    jest.spyOn(addAccountReposityStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
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
      id: 'validId',
      name: 'validName',
      email: 'validMail',
      password: 'hashedValue'
    })
  })
})
