import { FindPlanCase } from '@domain/use-cases/plans/find-plan-db'
import { UpdatePlanCase } from '@domain/use-cases/plans/update-plan-db'
import { InvalidParamError, ControllerInterface, HttpRequest, HttpResponse, invalidParam } from '@presentation/controllers/plans/plans-protocols'
import { ServerError } from '@presentation/errors'
import { serverError, successResponse } from '@presentation/helpers/http/http-helper'

export class PlansController implements ControllerInterface {
  constructor (private readonly findPlan:FindPlanCase, private readonly updatePlan:UpdatePlanCase) { }

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    const { id } = httpRequest.params
    try {
      const plan = this.findPlan.find(id)
      
      if (!plan) { return invalidParam(new InvalidParamError('Plan not exist')) }

      const updatedPlan = await this.updatePlan.update({ id, ...httpRequest.body })
      return successResponse(updatedPlan)
    } catch (err) {
      return serverError(new ServerError(err))
    }
  }
}
