
import { UpdatePlan } from '@data/use-cases/plans/update/update-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makeUpdatePlanFactory = () => {
  const repository = new PlanRepository()
  return new UpdatePlan(repository)
}
