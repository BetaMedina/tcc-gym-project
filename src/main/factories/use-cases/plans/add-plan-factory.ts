import { AddPlan } from '@data/use-cases/plans/create/add-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makeAddPlanFactory = () => {
  const repository = new PlanRepository()
  return new AddPlan(repository)
}
