import { Middleware, HttpRequest, HttpResponse, LoadAccountByToken } from './auth-middleware-protocols'
import { forbidden, successResponse, serverError } from '@presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly admin?:boolean
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.admin)
        if (account) {
          return successResponse({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
