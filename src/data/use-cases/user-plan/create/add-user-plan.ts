import { IAddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { UserAccount } from '@domain/models/account/user-account'
import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '@domain/models/student/student'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { AddUserPlan } from '@domain/use-cases/users-plan/add-user-plan'

export class AddUserPlanCase implements AddUserPlan {
  constructor (private readonly addUserPlanRepository: IAddUserPlanRepository) {}
  async create (student:StudentModel, plan:Plan):Promise<UserPlanModel> {
    return this.addUserPlanRepository.createRow(student, plan)
  }
}
