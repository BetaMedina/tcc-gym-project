import { ListUsersPlansController } from '@presentation/controllers/usersPlans/list/users-plans'
import { makeListUserFactory } from '@main/factories/use-cases/user-plans/list-user-plan-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeListUserPlans = () => {
  const listUserPlanController = new ListUsersPlansController(makeListUserFactory())

  return makeLogErrorDecorator(listUserPlanController)
}
