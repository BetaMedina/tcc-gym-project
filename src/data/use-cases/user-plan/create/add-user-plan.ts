import { AddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { AddUserPlan, UserPlanReceveid } from '@domain/use-cases/users-plan/add-user-plan'

export class AddUserPlanCase implements AddUserPlan {
  constructor (private readonly addUserPlanRepository: AddUserPlanRepository) {}
  async create (user:any, plan:any):Promise<UserPlanModel> {
    return this.addUserPlanRepository.createRow(user, plan)
  }
}
