import { PlansController } from '@presentation/controllers/plans/read/plans-controller'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'

export const makeReadPlanController = () => {
  const logRepository = new LogMongoRepository()
  const planController = new PlansController(makeReadPlanFactory())

  return new LogErrorDecorator(planController, logRepository)
}
