import { Plan } from '@domain/models/plans/plans'

export interface AddPlanReceived{
  name:string,
  price:Number,
  duration:Number
}

export interface AddPlanCase{
  create (account:AddPlanReceived):Promise<Plan> 
}
