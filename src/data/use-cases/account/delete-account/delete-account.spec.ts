import { DeleteAccount } from './delete-account'

import { IDeletePlanRepository } from '@data/protocols/plan/delete-plan-db'
import { IDeleteAccountRepository } from '@data/protocols/account/delete-account'

interface SutTypes { 
  deleteAccountSut:IDeleteAccountRepository
  sut:DeleteAccount
}

const makeSut = ():SutTypes => {
  class DeleteAccountStub implements IDeleteAccountRepository {
    async deleteRow ():Promise<boolean> {
      return true
    }
  }
  const deleteAccountSut = new DeleteAccountStub()
  const sut = new DeleteAccount(deleteAccountSut)

  return { 
    deleteAccountSut,
    sut
  } 
}

describe('=== Delete Account Use Case ===', () => {
  it('Should expected to throw a new error if Read throw', async () => {
    const { deleteAccountSut, sut } = makeSut()
    
    jest.spyOn(deleteAccountSut, 'deleteRow').mockImplementationOnce(() => { throw new Error('any_error') })
    expect(sut.delete(1)).rejects.toThrow()
  })
  it('Should expected to call delete with correct params', async () => {
    const { deleteAccountSut, sut } = makeSut()
    
    const params = jest.spyOn(deleteAccountSut, 'deleteRow')
    await sut.delete(1)
    expect(params).toBeCalledWith(1)
  })
  it('Should expected return boolean response ', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.delete(1)
    expect(httpResponse).toEqual(true)
  })
})
