import { Plan } from '@domain/models/plans'

export interface AddPlanReceived{
  name:string,
  price:Number,
  duration:string
}

export interface AddPlanCase{
  create (account:AddPlanReceived):Promise<Plan> 
}
