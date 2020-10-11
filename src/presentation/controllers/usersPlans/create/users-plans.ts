import { ILoadStudentById } from '@domain/use-cases/student/load-account-by-id'
import { NotFoundError, ServerError } from '@presentation/errors'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import {
  Validation,
  FindPlanCase,
  AddUserPlan,
  badRequest, 
  serverError, 
  successResponse
} from '../users-plans.protocols'

export class UsersPlans implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation, 
    private readonly findPlan:FindPlanCase, 
    private readonly userAccount:ILoadStudentById,
    private readonly addUserPlan:AddUserPlan
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const error = await this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const plan = await this.findPlan.find(httpRequest.body.planId)
      if (!plan) { 
        return badRequest(new NotFoundError('Id plan'))
      }
      const user = await this.userAccount.load(httpRequest.body.studentId)
      if (!user) { 
        return badRequest(new NotFoundError('Id user'))
      }
      
      const response = await this.addUserPlan.create(user, plan)
      return successResponse(response)
    } catch (err) {
      return serverError(new ServerError('Internal server error'))
    }
  }
}
