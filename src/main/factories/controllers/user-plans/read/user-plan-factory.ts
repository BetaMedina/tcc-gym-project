import { ReadUsersPlans } from '@presentation/controllers/usersPlans/read/users-plans'
import { makeReadUserPlansFactory } from '@main/factories/use-cases/user-plans/read-user-plan-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeReadUserPlans = () => {
  const usersPlans = new ReadUsersPlans(makeReadUserPlansFactory())
  return makeLogErrorDecorator(usersPlans)
}
