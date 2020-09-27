import { IReadUserPlanRepository } from '@data/protocols/user-plan/read-user-plan'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { IReadUsersPlans } from '@domain/use-cases/users-plan/read-user-plan'

export class ReadUserPlanCase implements IReadUsersPlans {
  constructor (
    private readonly findUserPlanRepo : IReadUserPlanRepository
  ) {}

  find (id:string):Promise<UserPlanModel> {
    return this.findUserPlanRepo.readRow(id)
  }
} 
