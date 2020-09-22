import { LoadAccountById } from '@domain/use-cases/account/load-account-by-id'
import { FindPlanCase } from '@domain/use-cases/plans/find-plan-db'
import { AddUserPlan } from '@domain/use-cases/users-plan/add-user-plan'
import { NotFoundError, ServerError } from '@presentation/errors'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { Validation } from '@presentation/protocols/validation'

export class UsersPlans implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation, 
    private readonly findPlan:FindPlanCase, 
    private readonly userAccount:LoadAccountById,
    private readonly addUserPlan:AddUserPlan
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

      const response = await this.addUserPlan.create(user, plan)
      return successResponse(response)
    } catch (err) {
      console.log(err.message)
      return serverError(new ServerError('Internal server error'))
    }
  }
}
