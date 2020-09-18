import { AddPlanCase } from '@domain/use-cases/plans/add-plan-db'
import { ServerError } from '@presentation/errors'
import { Validation, invalidParam, serverError, successResponse } from '../plans-protocols'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'

export class PlansController implements ControllerInterface {
  constructor (private readonly payloadValidation:Validation, private readonly createPlan:AddPlanCase) { }

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const error = await this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return invalidParam(error)
      }
      const response = await this.createPlan.create(httpRequest.body)
      return successResponse(response)
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
