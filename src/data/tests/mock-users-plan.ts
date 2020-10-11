import { IReadUserPlanRepository } from '@data/protocols/user-plan/read-user-plan'
import { UserAccount } from '@domain/models/account/user-account'
import { Plan } from '@domain/models/plans/plans'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'

export class ReadUserPlanRepositoryStub implements IReadUserPlanRepository {
  async readRow (id:string):Promise<UserPlanModel> {
    return {
      id: 1,
      student: {} as Students,
      plan: {} as Plan
    } 
  }
}
