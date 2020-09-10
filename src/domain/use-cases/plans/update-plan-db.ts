import { Plan } from '@domain/models/plans/plans'

export interface UpdatePlanReceived{
  id:Number,
  name:string,
  price:Number,
  duration:string
}

export interface UpdatePlanCase{
  update (payload:UpdatePlanReceived):Promise<Plan> 
}
