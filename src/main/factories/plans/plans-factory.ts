import { PlansController } from '@presentation/controllers/plans/plans-controller'
import { makePlanValidation } from './plans-validation'
import { AddPlan } from '@data/use-cases/plans/add-plan'
import { Plan } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makePlansController = () => {
  const repository = new Plan()
  const addPlanCase = new AddPlan(repository)
  return new PlansController(makePlanValidation(), addPlanCase)
}
