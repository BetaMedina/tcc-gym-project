import { AddUserPlanCase } from '@data/use-cases/user-plan/create/add-user-plan'
import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'

export const makeAddUserPlansFactory = () => {
  const userPlanRepository = new UserPlanRepository()
  return new AddUserPlanCase(userPlanRepository)
}
