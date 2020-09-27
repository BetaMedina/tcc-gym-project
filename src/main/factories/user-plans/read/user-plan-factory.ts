import { ReadUsersPlans } from '@presentation/controllers/usersPlans/read/users-plans'
import { ReadUserPlanCase } from '@data/use-cases/user-plan/read/read-user-plan'

import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makeReadUserPlans = () => {
  const repository = new UserPlanRepository()
  const readUserPlanCase = new ReadUserPlanCase(repository)
  
  const usersPlans = new ReadUsersPlans(readUserPlanCase)
  
  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(usersPlans, logRepository)
}
