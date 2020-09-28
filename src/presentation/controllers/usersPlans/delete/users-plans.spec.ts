import { IDeletePlan } from '@domain/use-cases/plans/delete-plan-db'
import { IDeleteUsersPlans } from '@domain/use-cases/users-plan/delelete-users-plan'
import { NotFoundError, ServerError } from '@presentation/errors'
import { DeleteUsersPlans } from './users-plans'

class DeleteUserPlanStub implements IDeleteUsersPlans {
  async delete (id:number):Promise<boolean> {
    return true
  }
}

interface ISutTypes{
  deleteUserPlanSut:IDeletePlan,
  sut:DeleteUsersPlans
}

const makeSut = ():ISutTypes => {
  const deleteUserPlanSut = new DeleteUserPlanStub()
  const sut = new DeleteUsersPlans(deleteUserPlanSut)
  return {
    deleteUserPlanSut,
    sut
  }
}

const makePayload = () => ({
  params: 1
})

describe('=== Delete User Plan Controller ===', () => {
  it('should expected to return error if service return', async () => {
    const { deleteUserPlanSut, sut } = makeSut()
    jest.spyOn(deleteUserPlanSut, 'delete').mockReturnValue(Promise.resolve(false))

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new NotFoundError('User plan'))
  })
  it('should return 500 if delete throws', async () => {
    const { deleteUserPlanSut, sut } = makeSut()
    jest.spyOn(deleteUserPlanSut, 'delete').mockImplementationOnce(() => { throw new Error('any_error') })

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any_error'))
  })
  it('should return 500 if delete throws', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual('User plan has been deleted')
  })
})
