import { Router } from 'express'
import { makeCreateStudentsController, makeListStudentsController, makeReadStudentController, makeUpdateStudentsController } from '../../factories/controllers/student'
import { adaptRoute } from '../../adapters/express-router-adapter'
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@main/factories/middlewares/auth-factory'

export default (route: Router):void => {
  route.post('/student', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeCreateStudentsController()))
  route.get('/student', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeListStudentsController()))
  route.get('/student/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeReadStudentController()))
  route.put('/student/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeUpdateStudentsController()))
}
