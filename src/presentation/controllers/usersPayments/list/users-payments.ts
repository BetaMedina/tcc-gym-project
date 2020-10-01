import { IListUsersPayments } from '@domain/use-cases/users-payments/list-users-payments'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { emptyResponse, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ServerError } from '@presentation/errors'
export class ListUsersPayments implements ControllerInterface {
  constructor (private readonly listUsersPayments:IListUsersPayments) {}
  async handle (): Promise<HttpResponse> {
    try {
      const usersPayments = await this.listUsersPayments.list()
      if (!usersPayments.length) {
        return emptyResponse()
      }
      return successResponse(usersPayments)
    } catch (err) {
      return serverError(new ServerError(err.msg))
    }
  }
}
