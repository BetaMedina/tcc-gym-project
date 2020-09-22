import { IListUsersPlans, emptyResponse } from './users-plan.protocols'
import { ControllerInterface, HttpResponse } from '@presentation/protocols'
import { serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ServerError } from '@presentation/errors'

export class ListUsersPlansController implements ControllerInterface {
  constructor (
    private readonly listUsersPlans:IListUsersPlans
  ) {}

  async handle ():Promise<HttpResponse> {
    try {
      const listUsers = await this.listUsersPlans.list()
      if (!listUsers.length) {
        return emptyResponse()
      }
      return successResponse(listUsers)
    } catch (err) {
      console.log(err.message)
      return serverError(new ServerError(err.message))
    }
  }
}
