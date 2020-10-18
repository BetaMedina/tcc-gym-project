import { LoadAccountById, FindPlanCase, IUserPayment, NotFoundError, ServerError, badRequest, serverError, successResponse, Validation } from '../users-plans.protocols'
import { ControllerInterface, HttpRequest, HttpResponse } from '@presentation/protocols'
import { ILoadStudentById } from '@domain/use-cases/student/load-account-by-id'
export class UsersPayments implements ControllerInterface {
  constructor (
    private readonly payloadValidation:Validation,
    private readonly findstudentId:ILoadStudentById,
    private readonly findPlan:FindPlanCase,
    private readonly createUserPayment:IUserPayment
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
      const { studentId, planId, ...data } = httpRequest.body
      const userPaymentResponse = await this.createUserPayment.create({ student: user, plan, ...data })
      return successResponse(userPaymentResponse)
    } catch (err) {
      return serverError(new ServerError(err.message))
    }
  }
}
