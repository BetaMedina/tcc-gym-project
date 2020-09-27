import { UsersPlans } from '@presentation/controllers/usersPlans/create/users-plans'
import { FindPlan } from '@data/use-cases/plans/read/read-plan'
import { DbLoadAccountById } from '@data/use-cases/account/load-account-id/load-account-id'
import { AddUserPlanCase } from '@data/use-cases/user-plan/create/add-user-plan'
import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'
import { UserPlanRepository } from '@infra/db/mysql/typeorm/repository/UserPlan/user-plan-repository'
import { makeUserPlansValidation } from './user-plans-validation'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makeUserPlansController = () => {
  const planRepository = new PlanRepository()
  const findPlan = new FindPlan(planRepository)
  
  const accountRepository = new Account()
  const loadAccount = new DbLoadAccountById(accountRepository)

  const userPlanRepository = new UserPlanRepository()
  const addUserPlan = new AddUserPlanCase(userPlanRepository)

  const loginController = new UsersPlans(makeUserPlansValidation(), findPlan, loadAccount, addUserPlan)

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(loginController, logRepository)
}
