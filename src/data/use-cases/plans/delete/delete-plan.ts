import { IDeletePlanRepository } from '@data/protocols/plan/delete-plan-db'
import { IDeletePlan } from '@domain/use-cases/plans/delete-plan-db'

export class DeletePlan implements IDeletePlan {
  constructor (private readonly deletePlanRepository:IDeletePlanRepository) {}
  async delete (id:number):Promise<boolean> {
    return this.deletePlanRepository.deleteRow(id)
  }
}
