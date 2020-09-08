import { Plan } from '@domain/models/plans/plans'

export interface ListPlans{
  list ():Promise<Plan[]> 
}
