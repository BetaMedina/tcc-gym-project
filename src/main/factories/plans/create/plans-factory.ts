import { PlansController } from '@presentation/controllers/plans/create/plans-controller'
import { makePlanValidation } from './plans-validation'
import { AddPlan } from '@data/use-cases/plans/create/add-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makePlansController = () => {
  const repository = new PlanRepository()
  const addPlanCase = new AddPlan(repository)

  const logRepository = new LogMongoRepository()
  const createPlan = new PlansController(makePlanValidation(), addPlanCase)
  
  return new LogErrorDecorator(createPlan, logRepository)
}
