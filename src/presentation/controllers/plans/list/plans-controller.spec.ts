import { ListPlansController } from './plans-controller'
import { ListPlans } from '@domain/use-cases/plans/list-plan-db'
import { emptyResponse, serverError } from '@presentation/helpers/http/http-helper'
import { ListPlansStub } from '@presentation/tests'

interface SutTypes { 
  listPlansSut:ListPlans
  sut:ListPlansController
}

const makeSut = ():SutTypes => {
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
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body[0].id).toBeTruthy()
    expect(httpResponse.body[0].name).toBeTruthy()
    expect(httpResponse.body[0].price).toBeTruthy()
    expect(httpResponse.body[0].duration).toBeTruthy()
  })
})
