import { ControllerInterface, HttpResponse } from '@presentation/protocols'
import { ServerError, emptyResponse, serverError, successResponse, IListUsersPayments } from '../users-plans.protocols'
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
