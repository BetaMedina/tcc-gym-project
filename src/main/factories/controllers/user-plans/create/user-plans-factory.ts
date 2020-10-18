import { UsersPlans } from '@presentation/controllers/usersPlans/create/users-plans'
import { makeUserPlansValidation } from './user-plans-validation'
import { makeAddUserPlansFactory } from '@main/factories/use-cases/user-plans/add-user-plan-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeReadAccountbyIdFactory } from '@main/factories/use-cases/account/find-account-id-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeUserPlansController = () => {
  const loginController = new UsersPlans(makeUserPlansValidation(), makeReadPlanFactory(), makeReadAccountbyIdFactory(), makeAddUserPlansFactory())
  return makeLogErrorDecorator(loginController)
}
