import { IReadUserPlanRepository } from '@data/protocols/user-plan/read-user-plan'
import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'

export class ReadUserPlanRepositoryStub implements IReadUserPlanRepository {
  async readRow (id:string):Promise<UserPlanModel> {
    return {
      id: 1,
      user: {} as UserAccount,
      plan: {} as Plan
    } 
  }
}
