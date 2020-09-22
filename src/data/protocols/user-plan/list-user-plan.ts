import { IListUserPlanModel } from '@domain/models/user-plans/list-users-plan'

export interface IListUserPlanRepository{
  listRows ():Promise<IListUserPlanModel[]> 
}
