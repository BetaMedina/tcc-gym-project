import { ReadUserPlanCase } from '@data/use-cases/user-plan/read/read-user-plan'

import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'

export const makeReadUserPlansFactory = () => {
  const repository = new UserPlanRepository()
  return new ReadUserPlanCase(repository)
}
