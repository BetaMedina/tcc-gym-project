import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { NotFoundError, ServerError } from '@presentation/errors'
import { IReadUsersPayment } from '@domain/use-cases/users-payments/read-users-payments'

export class ReadUsersPayments implements ControllerInterface {
  constructor (
    private readonly readUserPayment:IReadUsersPayment
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userPlan = await this.readUserPayment.find(httpRequest.params.id)
      if (!userPlan) {
        return badRequest(new NotFoundError('user payment'))
      }
      return successResponse(userPlan)
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
