import { successResponse } from '@presentation/helpers/http/http-helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import {
  FindPlanCase, LoadAccountById, Validation, badRequest, 
  NotFoundError, IUpdateUserPlan, ServerError, serverError 
} from '../users-plans.protocols'

export class UsersPlans implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation, 
    private readonly findPlan:FindPlanCase, 
    private readonly userAccount:LoadAccountById,
    private readonly updateUserPlan:IUpdateUserPlan
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const error = await this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const plan = await this.findPlan.find(httpRequest.body.planId)
      if (!plan) { 
        return badRequest(new NotFoundError('Id plan'))
      }
      const user = await this.userAccount.load(httpRequest.body.userId)
      if (!user) { 
        return badRequest(new NotFoundError('Id user'))
      }
      const updateResponse = await this.updateUserPlan.update(httpRequest.body.id, user, plan) 
      return successResponse(updateResponse)
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
