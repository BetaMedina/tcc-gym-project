import { IDeletePlan } from '@domain/use-cases/plans/delete-plan-db'
import { NotFoundError, ServerError } from '@presentation/errors'
import { PlansController } from './plans-controller'

class DeletePlanStub implements IDeletePlan {
  async delete (id:number):Promise<boolean> {
    return true
  }
}

interface ISutTypes{
  deletePlanSut:IDeletePlan,
  sut:PlansController
}

const makeSut = ():ISutTypes => {
  const deletePlanSut = new DeletePlanStub()
  const sut = new PlansController(deletePlanSut)
  return {
    deletePlanSut,
    sut
  }
}

const makePayload = () => ({
  params: 1
})

describe('=== Plan Delete Controller ===', () => {
  it('should expected to return error if service return', async () => {
    const { deletePlanSut, sut } = makeSut()
    jest.spyOn(deletePlanSut, 'delete').mockReturnValue(Promise.resolve(false))

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new NotFoundError('Plan'))
  })
  it('should return 500 if delete throws', async () => {
    const { deletePlanSut, sut } = makeSut()
    jest.spyOn(deletePlanSut, 'delete').mockImplementationOnce(() => { throw new Error('any_error') })

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any_error'))
  })
  it('should return 500 if delete throws', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makePayload())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual('Plan has been deleted')
  })
})
