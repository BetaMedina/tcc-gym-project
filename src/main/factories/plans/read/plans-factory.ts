import { PlansController } from '@presentation/controllers/plans/read/plans-controller'
import { FindPlan } from '@data/use-cases/plans/read/read-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makeReadPlanController = () => {
  const repository = new PlanRepository()
  const findPlan = new FindPlan(repository)

  const logRepository = new LogMongoRepository()
  const planController = new PlansController(findPlan)

  return new LogErrorDecorator(planController, logRepository)
}
