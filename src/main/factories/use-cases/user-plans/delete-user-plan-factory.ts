import { DeleteUserPlan } from '@data/use-cases/user-plan/delete/delete-user-plan'
import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'

export const makeDeleteUserPlansFactory = () => {
  const userPlanRepository = new UserPlanRepository()
  return new DeleteUserPlan(userPlanRepository)
}
