import { Plan } from '@domain/models/plans/plans'

interface readPlanIdReceveid{
  id:Number
}

export interface ReadPlanRepository{
  readRows (payload:readPlanIdReceveid):Promise<Plan> 
}
