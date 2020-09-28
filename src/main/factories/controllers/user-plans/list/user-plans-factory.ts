import { ListUsersPlansController } from '@presentation/controllers/usersPlans/list/users-plans'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeListUserFactory } from '@main/factories/use-cases/user-plans/list-user-plan-factory'

export const makeListUserPlans = () => {
  const listUserPlanController = new ListUsersPlansController(makeListUserFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(listUserPlanController, logRepository)
}
