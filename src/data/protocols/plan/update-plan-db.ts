import { Plan } from '@domain/models/plans/plans'

export interface UpdatePlanRepository{
  updateRows (payload:Plan):Promise<Plan> 
}
