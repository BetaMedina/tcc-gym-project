
import { ServerError, UnauthorizedError } from '../../errors'
import { HttpResponse } from '../../protocols' 

export const badRequest = (error:Error):HttpResponse => ({
  statusCode: 400,
  body: error
})
export const invalidParam = (error:Error):HttpResponse => ({
  statusCode: 400,
  body: error
})
export const serverError = (error:Error):HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const successResponse = (body):HttpResponse => ({
  statusCode: 200,
  body
})

export const emptyResponse = ():HttpResponse => ({
  statusCode: 204,
  body: 'emptyResponse'
})

export const unauthorizedResponse = ():HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})
