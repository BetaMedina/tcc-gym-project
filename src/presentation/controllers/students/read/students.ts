import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { ServerError } from '@presentation/errors'
import { emptyResponse, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { IReadStudents } from '@domain/use-cases/student/read-student'

export class StudentController implements ControllerInterface {
  constructor (private readonly listStudent:IReadStudents) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const response = await this.listStudent.read(httpRequest.params.id)
      if (!response) {
        return emptyResponse()
      }
      return successResponse(response)
    } catch (err) {
      return serverError(new ServerError(err.stack))
    }
  }
}
