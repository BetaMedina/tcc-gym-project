import { MongoHelper } from '@infra/db/mongo/helper/mongo.helper'
import server from './config/app'
import env from './config/env'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'

MongoHelper.connect(env.mongoUrl).then(async () => {
  createConnection('medina').then(() => {
    server.listen('3333', () => {
      console.log('Server is running on port 3333 ')
    })
  })
})
