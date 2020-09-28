import { PlansController } from '@presentation/controllers/plans/update/plans-controller'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeUpdatePlanFactory } from '@main/factories/use-cases/plans/update-plan-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'

export const makeUpdatePlanController = () => {
  const planUpdate = new PlansController(makeReadPlanFactory(), makeUpdatePlanFactory())
  const logRepository = new LogMongoRepository()

  return new LogErrorDecorator(planUpdate, logRepository)
}
