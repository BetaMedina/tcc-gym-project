import { PlansController } from '@presentation/controllers/plans/read/plans-controller'
import { FindPlan } from '@data/use-cases/plans/read/read-plan'
import { UpdatePlan } from '@data/use-cases/plans/update/update-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makeReadPlanController = () => {
  const repository = new PlanRepository()
  const findPlan = new FindPlan(repository)
  return new PlansController(findPlan)
}
