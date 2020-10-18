import { DeleteUsersPlans } from '@presentation/controllers/usersPlans/delete/users-plans'
import { makeDeleteUserPlansFactory } from '@main/factories/use-cases/user-plans/delete-user-plan-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeDeleteUserPlansController = () => {
  const loginController = new DeleteUsersPlans(makeDeleteUserPlansFactory())
  return makeLogErrorDecorator(loginController)
}
