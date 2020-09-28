import { AddUserPlanCase } from '@data/use-cases/user-plan/create/add-user-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'
import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makeAddUserPlansFactory = () => {
  const userPlanRepository = new UserPlanRepository()
  return new AddUserPlanCase(userPlanRepository)
}
