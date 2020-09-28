import { PlansController } from '@presentation/controllers/plans/delete/plans-controller'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeDeletePlanFactory } from '@main/factories/use-cases/plans/delete-plan-factory'

export const makeDeletePlanController = () => {
  const logRepository = new LogMongoRepository()
  const deletePlan = new PlansController(makeDeletePlanFactory())
  
  return new LogErrorDecorator(deletePlan, logRepository)
}
