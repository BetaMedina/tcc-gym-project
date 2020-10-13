import { ICreateStudent } from '@domain/use-cases/student/create-student'
import { ServerError } from '@presentation/errors'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { Validation } from '@presentation/protocols/validation'

export class Students implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation,
    private readonly createStudent:ICreateStudent
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const error = this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const student = await this.createStudent.create(httpRequest.body)
      return successResponse(student)
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
