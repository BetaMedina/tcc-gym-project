import { AddPlanRepository } from '@data/protocols/plan/add-plan-db'
import { Plan } from '@domain/models/plans/plans'
import { AddPlanCase, AddPlanReceived } from '@domain/use-cases/plans/add-plan-db'

export class AddPlan implements AddPlanCase {
  constructor (private readonly planRepository:AddPlanRepository) {}

  create (plan:AddPlanReceived):Promise<Plan> {
    return this.planRepository.createRow(plan)
  }
}
