import { IAddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { IListUserPlanRepository } from '@data/protocols/user-plan/list-user-plan'
import { IUpdateUserPlanRepository } from '@data/protocols/user-plan/update-user-plan'
import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'
import { IListUserPlanModel } from '@domain/models/user-plans/list-users-plan'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { getRepository } from 'typeorm'
import { Plans } from '../../entities/plans-entities'
import { Users } from '../../entities/users-entities'
import { UsersPlans } from '../../entities/users-plans-entities'

export class UserPlanRepository implements IAddUserPlanRepository, IListUserPlanRepository, IUpdateUserPlanRepository {
  async createRow (user:UserAccount, plan:Plan):Promise<UserPlanModel> {
    const userPlan = new UsersPlans()
    userPlan.user = user as Users
    userPlan.plan = plan as Plans 
    return getRepository(UsersPlans).create(userPlan).save()
  }

  async listRows ():Promise<UserPlanModel[]> {
    return getRepository(UsersPlans).find({ relations: ['user', 'plan'] })
  }

  updateRow (id:number, user:UserAccount, plan:Plan):Promise<UserPlanModel> {
    const userPlan = new UsersPlans()
    userPlan.id = id
    userPlan.user = user as Users
    userPlan.plan = plan as Plans 
    return getRepository(UsersPlans).save(userPlan)
  }
}
