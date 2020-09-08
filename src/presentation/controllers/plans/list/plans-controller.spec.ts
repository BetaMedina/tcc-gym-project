import { ListPlansController } from './plans-controller'
import { Plan } from '@domain/models/plans/plans'
import { ListPlans } from '@domain/use-cases/plans/list-plan-db'
import { emptyResponse, serverError } from '@presentation/helpers/http/http-helper'

interface SutTypes { 
  listPlansSut:ListPlans
  sut:ListPlansController
}

const makeSut = ():SutTypes => {
  class ListPlansStub implements ListPlans {
    async list ():Promise<Plan[]> {
      return [{
        id: 1,
        name: 'any_name',
        price: 99,
        duration: '3 m'
      }]
    }
  }
  const listPlansSut = new ListPlansStub()
  const sut = new ListPlansController(listPlansSut)

  return { 
    listPlansSut,
    sut
  } 
}

describe('=== List Plans Controller ===', () => {
  it('Should expected to throw a new error if List All Plans throw', async () => {
    const { listPlansSut, sut } = makeSut()

    jest.spyOn(listPlansSut, 'list').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
  it('Should expected to throw a new error if List All Plans throw', async () => {
    const { listPlansSut, sut } = makeSut()

    jest.spyOn(listPlansSut, 'list').mockReturnValue(null)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(emptyResponse())
    expect(httpResponse.statusCode).toBe(204)
  })
  it('Should expected return one Plans array', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle()
    expect(httpResponse.body).toEqual([{
      id: 1,
      name: 'any_name',
      price: 99,
      duration: '3 m'
    }])
  })
})
