import { Plan } from '@domain/models/plans/plans'

export interface findPlanReceived{
  id:Number,
}

export interface FindPlanCase{
  find (payload:findPlanReceived):Promise<Plan> 
}
