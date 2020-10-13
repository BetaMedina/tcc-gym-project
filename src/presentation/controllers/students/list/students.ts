import { ControllerInterface, HttpResponse } from '@presentation/protocols'
import { ServerError } from '@presentation/errors'
import { emptyResponse, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { IListStudents } from '@domain/use-cases/student/list-student'

export class StudentController implements ControllerInterface {
  constructor (private readonly listPlans:IListStudents) {}

  async handle ():Promise<HttpResponse> {
    try {
      const response = await this.listPlans.list()
      if (!response) {
        return emptyResponse()
      }
      return successResponse(response)
    } catch (err) {
      return serverError(new ServerError(err.stack))
    }
  }
}
