import { UpdateUserPlanCase } from '@data/use-cases/user-plan/update/update-user-plan'

import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'

export const makeUpdateUserPlansFactory = () => {
  const repository = new UserPlanRepository()
  return new UpdateUserPlanCase(repository)
}
