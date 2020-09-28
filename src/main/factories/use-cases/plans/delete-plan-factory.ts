import { DeletePlan } from '@data/use-cases/plans/delete/delete-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makeDeletePlanFactory = () => {
  const repository = new PlanRepository()
  return new DeletePlan(repository)
}
