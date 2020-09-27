import { UsersPlans } from '@presentation/controllers/usersPlans/update/users-plans'
import { UpdateUserPlanCase } from '@data/use-cases/user-plan/update/update-user-plan'
import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'
import { DbLoadAccountById } from '@data/use-cases/account/load-account-id/load-account-id'
import { FindPlan } from '@data/use-cases/plans/read/read-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'
import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeUserPlansValidation } from './user-plans-validation'

export const makeUpdateUserPlans = () => {
  const planRepository = new PlanRepository()
  const findPlan = new FindPlan(planRepository)
  
  const accountRepository = new Account()
  const loadAccount = new DbLoadAccountById(accountRepository)
  
  const repository = new UserPlanRepository()
  const updateUserPlanCase = new UpdateUserPlanCase(repository)

  const usersPlans = new UsersPlans(makeUserPlansValidation(), findPlan, loadAccount, updateUserPlanCase)
  
  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(usersPlans, logRepository)
}
