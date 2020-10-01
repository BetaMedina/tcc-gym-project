import { LoadAccountById } from '@domain/use-cases/account/load-account-by-id'
import { FindPlanCase } from '@domain/use-cases/plans/find-plan-db'
import { IUserPayment } from '@domain/use-cases/users-payments/add-users-payments'
import { NotFoundError, ServerError } from '@presentation/errors'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { Validation } from '@presentation/protocols/validation'

export class UsersPayments implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation,
    private readonly findUserId:LoadAccountById,
    private readonly findPlan:FindPlanCase,
    private readonly createUserPayment:IUserPayment
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const error = await this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
    
      const user = await this.findUserId.load(httpRequest.body.userId)
      if (!user) {
        return badRequest(new NotFoundError('Id user'))
      }

      const plan = await this.findPlan.find(httpRequest.body.planId)
      if (!plan) {
        return badRequest(new NotFoundError('Id plan'))
      }
      const { userId, planId, ...data } = httpRequest.body
      const userPaymentResponse = await this.createUserPayment.create({ user, plan, ...data })
      return successResponse(userPaymentResponse)
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
