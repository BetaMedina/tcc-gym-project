import { IDeleteAccount } from '@domain/use-cases/account/delete-account-db'
import { IDeletePlan } from '@domain/use-cases/plans/delete-plan-db'
import { NotFoundError, ServerError } from '@presentation/errors'
import { AccountController } from './account-controller'

class DeleteAccountStub implements IDeleteAccount {
  async delete (id:number):Promise<boolean> {
    return true
  }
}

interface ISutTypes{
  deleteAccountSut:IDeletePlan,
  sut:AccountController
}

const makeSut = ():ISutTypes => {
  const deleteAccountSut = new DeleteAccountStub()
  const sut = new AccountController(deleteAccountSut)
  return {
    deleteAccountSut,
    sut
  }
}

const makePayload = () => ({
  params: 1
})

describe('=== Delete Account Controller ===', () => {
  it('should expected to return error if service return', async () => {
    const { deleteAccountSut, sut } = makeSut()
    jest.spyOn(deleteAccountSut, 'delete').mockReturnValue(Promise.resolve(false))

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new NotFoundError('Account'))
  })
  it('should return 500 if delete throws', async () => {
    const { deleteAccountSut, sut } = makeSut()
    jest.spyOn(deleteAccountSut, 'delete').mockImplementationOnce(() => { throw new Error('any_error') })

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any_error'))
  })
  it('should return 500 if delete throws', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual('Account has been deleted')
  })
})
