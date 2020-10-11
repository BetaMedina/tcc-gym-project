import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '@domain/models/student/student'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { AddUserPlan } from '@domain/use-cases/users-plan/add-user-plan'
import { IReadUsersPlans } from '@domain/use-cases/users-plan/read-user-plan'
import { IUpdateUserPlan } from '@domain/use-cases/users-plan/update-user-plan'

export class AddUserPlanStub implements AddUserPlan {
  async create (student:StudentModel, plan:Plan):Promise<UserPlanModel> {
    return {
      id: 1,
      student: {} as StudentModel,
      plan: {} as Plan
    }
  }
}

export class UpdateUserPlanStub implements IUpdateUserPlan {
  async update (id:number, student:StudentModel, plan:Plan):Promise<UserPlanModel> {
    return {
      id: 1,
      student: {} as StudentModel,
      plan: {} as Plan 
    }
  }
}

export class ReadUserPlanStub implements IReadUsersPlans {
  async find (id:string):Promise<UserPlanModel> {
    return {
      id: 1,
      student: {} as StudentModel,
      plan: {} as Plan
    } 
  }
}
