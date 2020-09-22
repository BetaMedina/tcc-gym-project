import { ListUsersPlansController } from '@presentation/controllers/usersPlans/list/users-plans'
import { ListUserPlan } from '@data/use-cases/user-plan/list/list-user-plan'
import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makeListUserPlans = () => {
  const listUserPlanRepository = new UserPlanRepository()
  const listUserPlan = new ListUserPlan(listUserPlanRepository)
  const listUserPlanController = new ListUsersPlansController(listUserPlan)

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(listUserPlanController, logRepository)
}
