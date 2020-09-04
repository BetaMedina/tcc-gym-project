import express from 'express'
import setupRoutes from './routes'
import setupMiddlewares from './middlewares'
import createConnection from '@infra/db/mysql/typeorm/conn/typeorm-conn'
import 'reflect-metadata'

const app = express()

async ():Promise<void> => {
  await createConnection()
}

setupMiddlewares(app)
setupRoutes(app)

export default app
