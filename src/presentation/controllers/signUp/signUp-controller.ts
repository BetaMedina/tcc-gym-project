import { ServerError } from '@presentation/errors'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { Validation, HttpRequest, HttpResponse, ControllerInterface, AddAccountRepository } from './signUp-protocols'

export class SignUp implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation,
    private readonly addAccount:AddAccountRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.addAccount.create(httpRequest.body)
      return successResponse('User created with success')
    } catch (err) {
      console.log(err)
      return serverError(new ServerError(err))
    }  
  }
} 
