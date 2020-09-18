import { FindUserCase } from '@domain/use-cases/account/find-account-db'
import { FindPlanCase } from '@domain/use-cases/plans/find-plan-db'
import { InvalidParamError, NotFoundError } from '@presentation/errors'
import { badRequest } from '@presentation/helpers/http/http-helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { Validation } from '@presentation/protocols/validation'

export class UsersPlans implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation, 
    private readonly findPlan:FindPlanCase, 
    private readonly userAccount:FindUserCase
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    const error = await this.payloadValidation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    if (!(await this.findPlan.find(httpRequest.body.planId))) { 
      return badRequest(new NotFoundError('Id plan'))
    }
    if (!(await this.userAccount.find(httpRequest.body.userId))) { 
      return badRequest(new NotFoundError('Id user'))
    }
  }
}
