import { PlansController } from '@presentation/controllers/plans/update/plans-controller'
import { FindPlan } from '@data/use-cases/plans/read/read-plan'
import { UpdatePlan } from '@data/use-cases/plans/update/update-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makeUpdatePlanController = () => {
  const repository = new PlanRepository()
  const findPlan = new FindPlan(repository)
  const updatePlan = new UpdatePlan(repository)

  const planUpdate = new PlansController(findPlan, updatePlan)
  const logRepository = new LogMongoRepository()

  return new LogErrorDecorator(planUpdate, logRepository)
}
