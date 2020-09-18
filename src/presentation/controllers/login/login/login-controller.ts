import { ServerError, badRequest, serverError, successResponse, unauthorizedResponse, Authentication, Validation } from './login-protocols'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'

export class LoginController implements ControllerInterface {
  constructor (private readonly payloadValidation:Validation, private readonly authentication:Authentication) {}
  
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const accessToken = await this.authentication.auth(httpRequest.body)
      if (!accessToken) {
        return unauthorizedResponse()
      }
      return successResponse(accessToken)
    } catch (err) {
      return serverError(new ServerError(err.stack))
    }
  }
}
