import { DeleteUserPlan } from './delete-user-plan'

import { IDeletePlanRepository } from '@data/protocols/plan/delete-plan-db'
import { IDeleteUserPlanRepository } from '@data/protocols/user-plan/delete-user-plan'

interface SutTypes { 
  deleteUserPlanSut:IDeleteUserPlanRepository
  sut:DeleteUserPlan
}

const makeSut = ():SutTypes => {
  class DeletePlanStub implements IDeleteUserPlanRepository {
    async deleteRow ():Promise<boolean> {
      return true
    }
  }
  const deleteUserPlanSut = new DeletePlanStub()
  const sut = new DeleteUserPlan(deleteUserPlanSut)

  return { 
    deleteUserPlanSut,
    sut
  } 
}

describe('=== Delete User Plan Use Case ===', () => {
  it('Should expected to throw a new error if Read throw', async () => {
    const { deleteUserPlanSut, sut } = makeSut()
    
    jest.spyOn(deleteUserPlanSut, 'deleteRow').mockImplementationOnce(() => { throw new Error('any_error') })
    expect(sut.delete(1)).rejects.toThrow()
  })
  it('Should expected to call delete with correct params', async () => {
    const { deleteUserPlanSut, sut } = makeSut()
    
    const params = jest.spyOn(deleteUserPlanSut, 'deleteRow')
    await sut.delete(1)
    expect(params).toBeCalledWith(1)
  })
  it('Should expected return one updated Plans ', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.delete(1)
    expect(httpResponse).toEqual(true)
  })
})
