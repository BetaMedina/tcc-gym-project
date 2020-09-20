
import { AddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { UserPlanReceveid } from '@domain/use-cases/users-plan/add-user-plan'
import { AddUserPlanCase } from './add-user-plan'

interface SutTypes{
  addUserPlanSut:AddUserPlanRepository
  sut:AddUserPlanCase
}

const makeSut = ():SutTypes => {
  class AddUserPlanRepositoryStub implements AddUserPlanRepository {
    async createRow (account:UserPlanReceveid):Promise<UserPlanModel> {
      return {
        id: 1,
        userId: 1,
        planId: 1
      }
    }
  }
  const addUserPlanSut = new AddUserPlanRepositoryStub()
  const sut = new AddUserPlanCase(addUserPlanSut)
  return {
    addUserPlanSut,
    sut
  }
}

describe('=== ADD USER PLAN ===', () => {
  it('Should expected to receveid correct parameters', async () => {
    const { addUserPlanSut, sut } = makeSut()
    const spyPlan = jest.spyOn(addUserPlanSut, 'createRow')
    const payload = {
      userId: 1,
      planId: 1
    }
    await sut.create(payload.userId, payload.planId)
    expect(spyPlan).toHaveBeenCalledWith(payload.userId, payload.planId)
  })
  it('Should expected to receveid correct parameters', async () => {
    const { addUserPlanSut, sut } = makeSut()
    jest.spyOn(addUserPlanSut, 'createRow').mockImplementation(() => { throw new Error() })
    const payload = {
      userId: 1,
      planId: 1
    }
    expect(sut.create(payload.userId, payload.planId)).rejects.toThrow()
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()
    const payload = {
      userId: 1,
      planId: 1
    }
    const response = await sut.create(payload.userId, payload.planId)
    expect(response).toEqual({
      id: 1,
      userId: 1,
      planId: 1
    })
  })
})
