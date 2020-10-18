import { IUpdateUserPlanRepository } from '@data/protocols/user-plan/update-user-plan'
import { UserAccount } from '@domain/models/account/user-account'
import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '@domain/models/student/student'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { IUpdateUserPlan } from '@domain/use-cases/users-plan/update-user-plan'

export class UpdateUserPlanCase implements IUpdateUserPlan {
  constructor (private readonly updateUserPlanRepository: IUpdateUserPlanRepository) {}
  async update (id:number, student:StudentModel, plan:Plan, date?:Date):Promise<UserPlanModel> {
    return this.updateUserPlanRepository.updateRow(id, student, plan, date)
  }
}
