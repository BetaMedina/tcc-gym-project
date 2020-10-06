import { ListAccountController } from '@presentation/controllers/account/list/account-controller'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeListAccountFactory } from '@main/factories/use-cases/account/list-account-factory'

export const makeListAccountController = () => {
  const logRepository = new LogMongoRepository() 
  const loginController = new ListAccountController(makeListAccountFactory())

  return new LogErrorDecorator(loginController, logRepository)
}
