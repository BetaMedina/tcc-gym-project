import { UsersPlans } from '@presentation/controllers/usersPlans/create/users-plans'
import { makeUserPlansValidation } from './user-plans-validation'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeAddUserPlansFactory } from '@main/factories/use-cases/user-plans/add-user-plan-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeReadAccountbyIdFactory } from '@main/factories/use-cases/account/find-account-id-factory'

export const makeUserPlansController = () => {
  const loginController = new UsersPlans(makeUserPlansValidation(), makeReadPlanFactory(), makeReadAccountbyIdFactory(), makeAddUserPlansFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(loginController, logRepository)
}
