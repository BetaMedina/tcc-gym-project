import { ReadUsersPlans } from '@presentation/controllers/usersPlans/read/users-plans'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeReadUserPlansFactory } from '@main/factories/use-cases/user-plans/read-user-plan-factory'

export const makeReadUserPlans = () => {
  const usersPlans = new ReadUsersPlans(makeReadUserPlansFactory())
  
  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(usersPlans, logRepository)
}
