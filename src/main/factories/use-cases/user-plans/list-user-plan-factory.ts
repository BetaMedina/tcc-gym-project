import { ListUserPlan } from '@data/use-cases/user-plan/list/list-user-plan'
import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'

export const makeListUserFactory = () => {
  const listUserPlanRepository = new UserPlanRepository()
  return new ListUserPlan(listUserPlanRepository)
}
