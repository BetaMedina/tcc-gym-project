import { UsersPlans } from '@presentation/controllers/usersPlans/update/users-plans'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeUserPlansValidation } from './user-plans-validation'
import { makeUpdateUserPlansFactory } from '@main/factories/use-cases/user-plans/update-user-plan-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeReadAccountbyIdFactory } from '@main/factories/use-cases/account/find-account-id-factory'

export const makeUpdateUserPlans = () => {
  const usersPlans = new UsersPlans(makeUserPlansValidation(), makeReadPlanFactory(), makeReadAccountbyIdFactory(), makeUpdateUserPlansFactory())
  
  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(usersPlans, logRepository)
}
