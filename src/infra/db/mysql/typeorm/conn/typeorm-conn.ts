import { createConnection, getConnectionOptions, Connection } from 'typeorm'

export default async (database?:string): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  return createConnection(
    Object.assign(defaultOptions, {
      database
    })
  )
}
