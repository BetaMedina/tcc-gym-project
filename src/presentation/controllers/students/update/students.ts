import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { ServerError, UnauthorizedError } from '@presentation/errors'
import { badRequest, emptyResponse, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { IReadStudents } from '@domain/use-cases/student/read-student'
import { IUpdateStudents } from '@domain/use-cases/student/update-student'
import { Validation } from '@presentation/protocols/validation'

export class StudentController implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation,
    private readonly listStudent:IReadStudents,
    private readonly updateStudent:IUpdateStudents
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const error = this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const response = await this.listStudent.read(httpRequest.params.id)
      if (!response) {
        return emptyResponse()
      }
      if (await (this.updateStudent.update(httpRequest.params.id, httpRequest.body))) { return successResponse('User has been updated') }
      
      return badRequest(new UnauthorizedError())
    } catch (err) {
      return serverError(new ServerError(err.stack))
    }
  }
}
