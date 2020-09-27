
import { IAddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { AddUserPlanCase } from './add-user-plan'

interface SutTypes{
  addUserPlanSut:IAddUserPlanRepository
  sut:AddUserPlanCase
}
let UserRequest
let PlanRequest

const makeSut = ():SutTypes => {
  class AddUserPlanRepositoryStub implements IAddUserPlanRepository {
    async createRow (user:Users, plan:Plans):Promise<UserPlanModel> {
      return {
        id: 1,
        user: {} as UserAccount,
        plan: {} as Plan
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
  beforeEach(() => {
    UserRequest = {
      id: 1,
      name: 'validName',
      email: 'validMail',
      password: 'hashPass',
      isAdmin: false 
    }

    PlanRequest = {
      id: 1,
      name: 'validName',
      price: 10,
      duration: 'validDuration'
    }
  })
  
  it('Should expected to receveid correct parameters', async () => {
    const { addUserPlanSut, sut } = makeSut()
    const spyPlan = jest.spyOn(addUserPlanSut, 'createRow')
    const payload = {
      userId: 1,
      planId: 1
    }

    await sut.create(UserRequest, PlanRequest)
    expect(spyPlan).toHaveBeenCalledWith(UserRequest, PlanRequest)
  })
  it('Should expected to receveid correct parameters', async () => {
    const { addUserPlanSut, sut } = makeSut()
    jest.spyOn(addUserPlanSut, 'createRow').mockImplementation(() => { throw new Error() })
    const payload = {
      userId: 1,
      planId: 1
    }
    expect(sut.create(UserRequest, PlanRequest)).rejects.toThrow()
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()
  
    const response = await sut.create(UserRequest, PlanRequest)
    expect(response).toEqual({
      id: 1,
      plan: {},
      user: {}
    })
  })
})
