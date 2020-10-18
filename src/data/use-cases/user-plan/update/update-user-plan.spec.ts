
import { UpdateUserPlanCase } from './update-user-plan'
import { IUpdateUserPlanRepository } from '@data/protocols/user-plan/update-user-plan'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { UserAccount } from '@domain/models/account/user-account'
import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '@domain/models/student/student'

interface SutTypes{
  updateUserPlanSut:IUpdateUserPlanRepository
  sut:UpdateUserPlanCase
}
let UserRequest
let PlanRequest

const makeSut = ():SutTypes => {
  class UpdateUserPlanRepositoryStub implements IUpdateUserPlanRepository {
    async updateRow (id:number, student:StudentModel, plan:Plan):Promise<UserPlanModel> {
      return {
        id: 1,
        student: {} as StudentModel,
        plan: {} as Plan
      }
    }
  }
  const updateUserPlanSut = new UpdateUserPlanRepositoryStub()
  const sut = new UpdateUserPlanCase(updateUserPlanSut)
  return {
    updateUserPlanSut,
    sut
  }
}

describe('=== UPDATE USER PLAN ===', () => {
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
      duration: 15
    }
  })
  
  it('Should expected to receveid correct parameters', async () => {
    const { updateUserPlanSut, sut } = makeSut()
    const spyPlan = jest.spyOn(updateUserPlanSut, 'updateRow')
    const date = new Date()
    await sut.update(1, UserRequest, PlanRequest, date)
    expect(spyPlan).toHaveBeenCalledWith(1, UserRequest, PlanRequest, date)
  })
  it('Should expected to receveid correct parameters', async () => {
    const { updateUserPlanSut, sut } = makeSut()
    jest.spyOn(updateUserPlanSut, 'updateRow').mockImplementation(() => { throw new Error() })
  
    expect(sut.update(1, UserRequest, PlanRequest)).rejects.toThrow()
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()
  
    const response = await sut.update(1, UserRequest, PlanRequest)
    expect(response).toEqual({
      id: 1,
      student: {},
      plan: {}
    })
  })
})
