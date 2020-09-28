import { DeletePlan } from './delete-plan'

import { IDeletePlanRepository } from '@data/protocols/plan/delete-plan-db'

interface SutTypes { 
  deletePlanSut:IDeletePlanRepository
  sut:DeletePlan
}

const makeSut = ():SutTypes => {
  class DeletePlanStub implements IDeletePlanRepository {
    async deleteRow ():Promise<boolean> {
      return true
    }
  }
  const deletePlanSut = new DeletePlanStub()
  const sut = new DeletePlan(deletePlanSut)

  return { 
    deletePlanSut,
    sut
  } 
}

describe('=== Delete Plan Use Case ===', () => {
  it('Should expected to throw a new error if Read throw', async () => {
    const { deletePlanSut, sut } = makeSut()
    
    jest.spyOn(deletePlanSut, 'deleteRow').mockImplementationOnce(() => { throw new Error('any_error') })
    expect(sut.delete(1)).rejects.toThrow()
  })
  it('Should expected to call delete with correct params', async () => {
    const { deletePlanSut, sut } = makeSut()
    
    const params = jest.spyOn(deletePlanSut, 'deleteRow')
    await sut.delete(1)
    expect(params).toBeCalledWith(1)
  })
  it('Should expected return one updated Plans ', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.delete(1)
    expect(httpResponse).toEqual(true)
  })
})
