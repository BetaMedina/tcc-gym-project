import { DeleteUsersPlans } from '@presentation/controllers/usersPlans/delete/users-plans'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeDeleteUserPlansFactory } from '@main/factories/use-cases/user-plans/delete-user-plan-factory'

export const makeDeleteUserPlansController = () => {
  const loginController = new DeleteUsersPlans(makeDeleteUserPlansFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(loginController, logRepository)
}
