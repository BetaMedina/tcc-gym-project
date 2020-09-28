import { IDeleteUserPlanRepository } from '@data/protocols/user-plan/delete-user-plan'
import { IDeleteUsersPlans } from '@domain/use-cases/users-plan/delelete-users-plan'

export class DeleteUserPlan implements IDeleteUsersPlans {
  constructor (private readonly deleteUserPlanRepository:IDeleteUserPlanRepository) {}
  async delete (id:number):Promise<boolean> {
    return this.deleteUserPlanRepository.deleteRow(id)
  }
}
