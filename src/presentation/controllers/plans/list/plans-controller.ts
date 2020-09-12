import { ListPlans } from '@domain/use-cases/plans/list-plan-db'
import { serverError, successResponse, emptyResponse } from '../plans-protocols'
import { ControllerInterface, HttpResponse } from '@presentation/protocols'
import { ServerError } from '@presentation/errors'

export class ListPlansController implements ControllerInterface {
  constructor (private readonly listPlans:ListPlans) {}

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
