import { IAddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { IListUserPlanRepository } from '@data/protocols/user-plan/list-user-plan'
import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'
import { IListUserPlanModel } from '@domain/models/user-plans/list-users-plan'
import { getRepository } from 'typeorm'
import { Plans } from '../../entities/plans-entities'
import { Users } from '../../entities/users-entities'
import { UsersPlans } from '../../entities/users-plans-entities'

export class UserPlanRepository implements IAddUserPlanRepository, IListUserPlanRepository {
  async createRow (user:UserAccount, plan:Plan):Promise<any> {
    const userPlan = new UsersPlans()
    userPlan.user = user as Users
    userPlan.plan = plan as Plans 
    return getRepository(UsersPlans).create(userPlan).save()
  }

  async listRows ():Promise<IListUserPlanModel[]> {
    return getRepository(UsersPlans).find({ relations: ['user', 'plan'] })
  }
}
