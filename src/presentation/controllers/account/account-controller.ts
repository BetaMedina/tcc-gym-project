import { IDeleteAccount } from './account-protocols'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { badRequest, NotFoundError, ServerError, serverError, successResponse } from '../plans/plans-protocols'

export class AccountController implements ControllerInterface {
  constructor (private readonly deleteAccount:IDeleteAccount) {}
  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      if (!(await (this.deleteAccount.delete(httpRequest.params.id)))) {
        return badRequest(new NotFoundError('Account'))
      }
      return successResponse('Account has been deleted')
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
