import { MongoHelper } from '@infra/db/mongo/helper/mongo.helper'
import server from './config/app'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
  server.listen('3333', () => {
    console.log('Server is running on port 3333 ')
  })
})
