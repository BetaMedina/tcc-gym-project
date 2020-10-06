import { IListUser } from '@domain/use-cases/account/list-account'
import { emptyResponse, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ControllerInterface, HttpResponse } from '@presentation/protocols'

export class ListAccountController implements ControllerInterface {
  constructor (private readonly getAllUsers:IListUser) {}
  async handle (): Promise<HttpResponse> {
    try {
      const getUsers = await this.getAllUsers.getAll()
      if (!getUsers.length) {
        return emptyResponse()
      }
      return successResponse(getUsers)
    } catch (err) {
      return serverError(err.message)
    }
  }
}
