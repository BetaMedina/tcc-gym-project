import { ListAccount } from './list-account'
import { Plan } from '@domain/models/plans/plans'
import { IListAccountsRepository } from '@data/protocols/account/list-account'
import { UserAccount } from '../load-account-token/load-account-token-protocols'

interface SutTypes { 
  listAccountSut:IListAccountsRepository
  sut:ListAccount
}

const makeSut = ():SutTypes => {
  class ListAccountsRepositoryStub implements IListAccountsRepository {
    async listRows ():Promise<UserAccount[]> {
      return [{
        id: 1,
        name: 'validName',
        email: 'validMail',
        password: 'validPass',
        isAdmin: false 
      }]
    }
  }
  const listAccountSut = new ListAccountsRepositoryStub()
  const sut = new ListAccount(listAccountSut)

  return { 
    listAccountSut,
    sut
  } 
}

describe('=== List Plans Use Case ===', () => {
  it('Should expected to throw a new error if List All Plans throw', async () => {
    const { listAccountSut, sut } = makeSut()

    jest.spyOn(listAccountSut, 'listRows').mockImplementationOnce(() => { throw new Error('any_error') })
    expect(sut.getAll()).rejects.toThrow()
  })
  it('Should expected return one Plans array', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.getAll()
    expect(httpResponse).toEqual([{
      id: 1,
      name: 'validName',
      email: 'validMail',
      password: 'validPass',
      isAdmin: false 
    }])
  })
})
