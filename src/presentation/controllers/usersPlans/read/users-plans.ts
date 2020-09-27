import { LoadAccountById, IReadUsersPlans } from '../users-plans.protocols'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { NotFoundError, ServerError } from '@presentation/errors'

export class ReadUsersPlans implements ControllerInterface {
  constructor (
    private readonly readUserAccount:IReadUsersPlans
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      console.log(httpRequest)
      const userPlan = await this.readUserAccount.find(httpRequest.params.id)
      if (!userPlan) {
        return badRequest(new NotFoundError('user plan'))
      }
      return successResponse(userPlan)
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
