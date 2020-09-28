import { IDeletePlan } from '../plans-protocols'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { NotFoundError, ServerError } from '@presentation/errors'

export class PlanController implements ControllerInterface {
  constructor (
    private readonly deletePlan:IDeletePlan
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      if (!await (this.deletePlan.delete(httpRequest.params.id))) {
        return badRequest(new NotFoundError('Plan'))
      }
      return successResponse('Plan has been deleted')
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
