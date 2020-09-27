import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { AddUserPlan } from '@domain/use-cases/users-plan/add-user-plan'
import { IReadUsersPlans } from '@domain/use-cases/users-plan/read-user-plan'
import { IUpdateUserPlan } from '@domain/use-cases/users-plan/update-user-plan'

export class AddUserPlanStub implements AddUserPlan {
  async create (user:UserAccount, plan:Plan):Promise<UserPlanModel> {
    return {
      id: 1,
      user: {} as UserAccount,
      plan: {} as Plan
    }
  }
}

export class UpdateUserPlanStub implements IUpdateUserPlan {
  async update (id:number, user:UserAccount, plan:Plan):Promise<UserPlanModel> {
    return {
      id: 1,
      user: {} as UserAccount,
      plan: {} as Plan 
    }
  }
}

export class ReadUserPlanStub implements IReadUsersPlans {
  async find (id:string):Promise<UserPlanModel> {
    return {
      id: 1,
      user: {} as UserAccount,
      plan: {} as Plan
    } 
  }
}
