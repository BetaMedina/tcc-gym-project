import { Plan } from '@domain/models/plans'
import { AddPlanReceived } from '@domain/use-cases/plans/add-plan-db'

export interface AddPlanRepository{
  createRow (account:AddPlanReceived):Promise<Plan> 
}
