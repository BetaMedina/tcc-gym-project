import { LoadAccountById, FindPlanCase, badRequest, Validation, IUpdateUserPayment } from '../users-plans.protocols'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { NotFoundError, ServerError } from '@presentation/errors'
import { serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ILoadStudentById } from '@domain/use-cases/student/load-account-by-id'

export class UpdateUsersPayments implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation,
    private readonly findstudentId:ILoadStudentById,
    private readonly findPlan:FindPlanCase,
    private readonly updateUserPayment:IUpdateUserPayment
  ) {}

  async handle (httpRequest:HttpRequest):Promise<HttpResponse> {
    try {
      const error = await this.payloadValidation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const user = await this.findstudentId.load(httpRequest.body.studentId)
      if (!user) {
        return badRequest(new NotFoundError('Id user'))
      }
      
      const plan = await this.findPlan.find(httpRequest.body.planId)
      if (!plan) {
        return badRequest(new NotFoundError('Id plan'))
      }
      const { studentId, planId, ...request } = httpRequest.body
      const { id } = httpRequest.params
      await this.updateUserPayment.update({ ...request, user, plan, id })
      return successResponse('User Payment updated success')
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
