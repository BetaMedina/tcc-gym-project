import { UsersPlans } from '@presentation/controllers/usersPlans/update/users-plans'
import { makeUserPlansValidation } from './user-plans-validation'
import { makeUpdateUserPlansFactory } from '@main/factories/use-cases/user-plans/update-user-plan-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeReadAccountbyIdFactory } from '@main/factories/use-cases/account/find-account-id-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeUpdateUserPlans = () => {
  const usersPlans = new UsersPlans(makeUserPlansValidation(), makeReadPlanFactory(), makeReadAccountbyIdFactory(), makeUpdateUserPlansFactory())
  return makeLogErrorDecorator(usersPlans)
}
