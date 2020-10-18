import { IAddUserPlanRepository } from '@data/protocols/user-plan/add-user-plan'
import { IDeleteUserPlanRepository } from '@data/protocols/user-plan/delete-user-plan'
import { IListUserPlanRepository } from '@data/protocols/user-plan/list-user-plan'
import { IReadUserPlanRepository } from '@data/protocols/user-plan/read-user-plan'
import { IUpdateUserPlanRepository } from '@data/protocols/user-plan/update-user-plan'
import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '@domain/models/student/student'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { getRepository } from 'typeorm'
import { Plans } from '../../entities/plans-entities'
import { Students } from '../../entities/students-entities'
import { UsersPlans } from '../../entities/users-plans-entities'

export class UserPlanRepository implements IAddUserPlanRepository, IListUserPlanRepository, IUpdateUserPlanRepository, IReadUserPlanRepository, IDeleteUserPlanRepository {
  async createRow (student:StudentModel, plan:Plan):Promise<UserPlanModel> {
    const userPlan = new UsersPlans()
    userPlan.student = student as Students
    userPlan.plan = plan as Plans 
    return getRepository(UsersPlans).create(userPlan).save()
  }

  async listRows ():Promise<UserPlanModel[]> {
    return getRepository(UsersPlans).find({ relations: ['student', 'plan'] })
  }

  async updateRow (id:number, student:StudentModel, plan:Plan, startDate?:Date):Promise<UserPlanModel> {
    const userPlan = new UsersPlans()
    userPlan.id = id
    userPlan.student = student as Students
    userPlan.plan = plan as Plans 
    userPlan.start_date = startDate
    return getRepository(UsersPlans).save(userPlan)
  }

  async readRow (id:string):Promise<UsersPlans> {
    return getRepository(UsersPlans).findOne({ relations: ['student', 'plan'], where: { id } })
  }

  async deleteRow (id:number):Promise<boolean> {
    return !!getRepository(UsersPlans).delete({ id })
  }
}
