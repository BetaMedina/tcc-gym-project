import { Request, Response } from 'express'
import { ControllerInterface, HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller:ControllerInterface) => {
  return async (req:Request, res:Response) => {
    const httpRequest:HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
    return res.status(httpResponse.statusCode).json(httpResponse.body.message)
  }
}
