import { FindPlanCase } from '@domain/use-cases/plans/find-plan-db'
import { InvalidParamError, ControllerInterface, HttpRequest, HttpResponse, invalidParam } from '@presentation/controllers/plans/plans-protocols'
import { serverError, successResponse } from '@presentation/helpers/http/http-helper'

export class PlansController implements ControllerInterface {
  constructor (private readonly findPlan:FindPlanCase) { }

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    const { id } = httpRequest.params
    try {
      const plan = await this.findPlan.find(id)
      
      if (!plan) { return invalidParam(new InvalidParamError('Plan not exist')) }

      return successResponse(plan)
    } catch (err) {
      console.log(err)
      return serverError(err)
    }
  }
}
