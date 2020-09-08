import { AddPlanCase } from '@domain/use-cases/plans/add-plan-db'
import { ControllerInterface, HttpRequest, HttpResponse, Validation, invalidParam, serverError, successResponse } from '../plans-protocols'

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
      console.log(err)
      return serverError(err.message)
    }
  }
}
