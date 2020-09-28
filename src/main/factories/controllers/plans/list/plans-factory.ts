import { ListPlansController } from '@presentation/controllers/plans/list/plans-controller'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeListPlansFactory } from '@main/factories/use-cases/plans/list-plan-factory'

export const makeListPlansController = () => {
  const logRepository = new LogMongoRepository()
  const listPlan = new ListPlansController(makeListPlansFactory())
  
  return new LogErrorDecorator(listPlan, logRepository)
}
