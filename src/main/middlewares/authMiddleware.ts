import { adaptMiddleware } from '@main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@main/factories/middlewares/auth-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())
