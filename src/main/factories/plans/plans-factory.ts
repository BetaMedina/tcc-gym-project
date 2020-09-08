import { PlansController } from '@presentation/controllers/plans/create/plans-controller'
import { makePlanValidation } from './plans-validation'
import { AddPlan } from '@data/use-cases/plans/create/add-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makePlansController = () => {
  const repository = new PlanRepository()
  const addPlanCase = new AddPlan(repository)
  return new PlansController(makePlanValidation(), addPlanCase)
}
