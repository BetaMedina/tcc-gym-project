import { IDeleteUsersPlans, NotFoundError, ServerError, badRequest, serverError, successResponse } from '../users-plans.protocols' 
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'

export class DeleteUsersPlans implements ControllerInterface {
  constructor (private readonly deleteUserPlan:IDeleteUsersPlans) {}
  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      if (!(await (this.deleteUserPlan.delete(httpRequest.params.id)))) {
        return badRequest(new NotFoundError('User plan'))
      }
      return successResponse('User plan has been deleted')
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
