import { AccountController } from '@presentation/controllers/account/delete/account-controller'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeDeleteAccountFactory } from '@main/factories/use-cases/account/delete-account-factory'

export const makeDeleteAccountController = () => {
  const logRepository = new LogMongoRepository() 
  const loginController = new AccountController(makeDeleteAccountFactory())

  return new LogErrorDecorator(loginController, logRepository)
}
