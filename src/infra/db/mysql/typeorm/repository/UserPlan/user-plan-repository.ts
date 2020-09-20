import { AddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { getRepository } from 'typeorm'
import { UsersPlans } from '../../entities/users-plans-entities'

export class UserPlanRepository implements AddUserPlanRepository {
  async createRow (user:any, plan:any):Promise<any> {
    const userPlan = new UsersPlans()
    userPlan.plan = plan.id
    userPlan.user = user.id
    return getRepository(UsersPlans).create(userPlan).save()
  }
}
