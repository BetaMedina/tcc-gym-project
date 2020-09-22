import { IListUserPlanModel } from '@domain/models/user-plans/list-users-plan'

export interface IListUsersPlans{
  list():Promise<IListUserPlanModel[]>
}
