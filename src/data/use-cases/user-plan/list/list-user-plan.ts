import { IListUserPlanRepository } from '@data/protocols/user-plan/list-user-plan'
import { IListUserPlanModel } from '@domain/models/user-plans/list-users-plan'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { IListUsersPlans } from '@domain/use-cases/users-plan/list-user-plan'

export class ListUserPlan implements IListUsersPlans {
  constructor (private readonly listPlanRepository:IListUserPlanRepository) {}
  list ():Promise<IListUserPlanModel[]> {
    return this.listPlanRepository.listRows()
  }
}
