import { badRequest } from '@presentation/helpers/http/http-helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { Validation } from '@presentation/protocols/validation'

export class UsersPlans implements ControllerInterface {
  constructor (private readonly payloadValidation:Validation) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    const error = await this.payloadValidation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}
