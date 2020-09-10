import { ReadPlanRepository } from '@data/protocols/plan/read-plan-db'

import { Plan } from '@domain/models/plans/plans'
import { FindPlanCase, findPlanReceived } from '@domain/use-cases/plans/find-plan-db'

export class FindPlan implements FindPlanCase {
  constructor (private readonly updatePlanRepository:ReadPlanRepository) {}
  async find (payload:findPlanReceived):Promise<Plan> {
    return this.updatePlanRepository.readRows(payload)
  }
}
