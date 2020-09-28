import { PlansController } from '@presentation/controllers/plans/create/plans-controller'
import { makePlanValidation } from './plans-validation'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeAddPlanFactory } from '@main/factories/use-cases/plans/add-plan-factory'

export const makePlansController = () => {
  const logRepository = new LogMongoRepository()
  const createPlan = new PlansController(makePlanValidation(), makeAddPlanFactory())
  
  return new LogErrorDecorator(createPlan, logRepository)
}
