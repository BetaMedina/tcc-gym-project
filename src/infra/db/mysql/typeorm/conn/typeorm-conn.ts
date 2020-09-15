import { createConnection, getConnectionOptions, Connection } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  const database = process.env.NODE_ENV === 'test' ? 'medina_test' : 'medina'
  console.log(process.env.NODE_ENV)
  return createConnection(
    Object.assign(defaultOptions, {
      database
    })
  )
}
