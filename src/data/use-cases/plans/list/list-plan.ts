import { ListPlansRepository } from '@data/protocols/plan/list-plan-db'
import { Plan } from '@domain/models/plans/plans'
import { ListPlans } from '@domain/use-cases/plans/list-plan-db'

export class ListPlansCase implements ListPlans {
  constructor (private readonly listPlansRepositoryStub:ListPlansRepository) {}
  async list ():Promise<Plan[]> {
    const plans = await this.listPlansRepositoryStub.listRows()
    return plans
  }
}
