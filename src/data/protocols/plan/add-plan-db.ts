import { Plan } from '@domain/models/plans/plans'
export interface AddPlanReceived{
  name:string,
  price:Number,
  duration:Number
}
export interface AddPlanRepository{
  createRow (account:AddPlanReceived):Promise<Plan> 
}
