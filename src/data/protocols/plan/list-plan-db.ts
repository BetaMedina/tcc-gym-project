import { Plan } from '@domain/models/plans/plans'

export interface ListPlansRepository{
  listRows ():Promise<Plan[]> 
}
