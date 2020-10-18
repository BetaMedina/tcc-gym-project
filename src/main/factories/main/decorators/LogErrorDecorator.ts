import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'

export const makeLogErrorDecorator = (controller) => {
  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(controller, logRepository)
}
