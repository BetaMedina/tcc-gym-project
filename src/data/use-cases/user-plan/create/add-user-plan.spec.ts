
import { IAddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { AddUserPlanCase } from './add-user-plan'

interface SutTypes{
  addUserPlanSut:IAddUserPlanRepository
  sut:AddUserPlanCase
}
let User
let Plan

const makeSut = ():SutTypes => {
  class AddUserPlanRepositoryStub implements IAddUserPlanRepository {
    async createRow (user:Users, plan:Plans):Promise<UserPlanModel> {
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
  beforeEach(() => {
    User = {
      id: 1,
      name: 'validName',
      email: 'validMail',
      password: 'hashPass',
      isAdmin: false 
    }

    Plan = {
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

    await sut.create(User, Plan)
    expect(spyPlan).toHaveBeenCalledWith(User, Plan)
  })
  it('Should expected to receveid correct parameters', async () => {
    const { addUserPlanSut, sut } = makeSut()
    jest.spyOn(addUserPlanSut, 'createRow').mockImplementation(() => { throw new Error() })
    const payload = {
      userId: 1,
      planId: 1
    }
    expect(sut.create(User, Plan)).rejects.toThrow()
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()
    const payload = {
      userId: 1,
      planId: 1
    }
    const response = await sut.create(User, Plan)
    expect(response).toEqual({
      id: 1,
      userId: 1,
      planId: 1
    })
  })
})
