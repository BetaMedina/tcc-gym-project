import { DbAddAccount } from './addAccount-data'
import { AddAccount } from '@data/protocols/account/add-account'
import { Encrypter } from '@data/protocols/encrypter/encrypt'
import { AddAccountReposityStub, HashStub } from '@data/tests'
import { mockAccountModel, mockAccountParams } from '@domain/tests/mock-user-model'
interface SutTypes {
  sut:DbAddAccount
  addAccountReposityStub:AddAccount
  encryptSut:Encrypter
}

const makeSut = ():SutTypes => {
  const addAccountReposityStub = new AddAccountReposityStub()
  const encryptSut = new HashStub()
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
    const accountData = mockAccountParams()
    await sut.create(accountData)
    expect(createSpy).toHaveBeenCalledWith({
      ...accountData,
      password: 'hashpassword'

    })
  })
  it('Should throw if addAccountRepositorie throws ', async () => {
    const { addAccountReposityStub, sut } = makeSut()
    jest.spyOn(addAccountReposityStub, 'createRow').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = mockAccountParams()
    expect(sut.create(accountData)
    ).rejects.toThrow()
  })

  it('Should throw if Hash throws ', async () => {
    const { sut, encryptSut } = makeSut()
    jest.spyOn(encryptSut, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = mockAccountParams()
    expect(sut.create(accountData)
    ).rejects.toThrow()
  })
  
  it('Should hash if correct values ', async () => {
    const { sut, encryptSut } = makeSut()
    const spyHash = jest.spyOn(encryptSut, 'encrypt')
    const accountData = mockAccountParams()
    await sut.create(accountData)
    expect(spyHash).toBeCalledWith(accountData.password)
  })

  it('Should return and account on success ', async () => {
    const { sut } = makeSut()
    const accountData = mockAccountParams()
    const account = await sut.create(accountData)
    expect(account).toEqual(mockAccountModel())
  })
})
