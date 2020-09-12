import { LogErrorRepository } from '@data/protocols/log/add-log'
import { MongoHelper } from '../helper/mongo.helper'
export class LogMongoRepository implements LogErrorRepository {
  async log (stack:string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({ stack, date: new Date() })
  }
}
