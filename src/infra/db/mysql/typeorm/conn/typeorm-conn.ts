import { createConnection, getConnectionOptions, Connection } from 'typeorm'

export default async (defaultDatabase = 'medina'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  const database = defaultDatabase
  return createConnection(
    Object.assign(defaultOptions, {
      database
    })
  )
}
