import { UpdatePlanRepository } from '@data/protocols/plan/update-plan-db'
import { UpdatePlanCase, UpdatePlanReceived } from '@domain/use-cases/plans/update-plan-db'

export class UpdatePlan implements UpdatePlanCase {
  constructor (private readonly updatePlanRepository:UpdatePlanRepository) {}
  async update (payload:UpdatePlanReceived):Promise<boolean> {
    return this.updatePlanRepository.updateRows(payload)
  }
}
