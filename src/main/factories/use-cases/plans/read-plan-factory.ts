import { FindPlan } from '@data/use-cases/plans/read/read-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makeReadPlanFactory = () => {
  const repository = new PlanRepository()
  return new FindPlan(repository)
}
