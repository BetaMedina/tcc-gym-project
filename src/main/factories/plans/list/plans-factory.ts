import { ListPlansController } from '@presentation/controllers/plans/list/plans-controller'
import { ListPlansCase } from '@data/use-cases/plans/list/list-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makeListPlansController = () => {
  const repository = new PlanRepository()
  const listPlansCase = new ListPlansCase(repository)

  const logRepository = new LogMongoRepository()
  const listPlan = new ListPlansController(listPlansCase)
  
  return new LogErrorDecorator(listPlan, logRepository)
}
