import { ListPlansRepository } from '@data/protocols/plan/list-plan-db'
import { UpdatePlanRepository } from '@data/protocols/plan/update-plan-db'
import { Plan } from '@domain/models/plans/plans'
import { UpdatePlanCase, UpdatePlanReceived } from '@domain/use-cases/plans/update-plan-db'

export class UpdatePlan implements UpdatePlanCase {
  constructor (private readonly updatePlanRepository:UpdatePlanRepository) {}
  async update (payload:UpdatePlanReceived):Promise<Plan> {
    return this.updatePlanRepository.updateRows(payload)
  }
}
