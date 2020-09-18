import { AuthenticationModel } from '@domain/models/account/authentication'
import { UserAccount } from '@domain/models/account/use-account'
import { AddAccountParams } from '@domain/use-cases/account/add-account-db'
import { AuthenticationParams } from '@domain/use-cases/account/authenticated'
import faker from 'faker'

export const mockAccountModel = ():UserAccount => ({
  id: 1,
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_pass',
  isAdmin: false 
})

export const mockAccountParams = ():AddAccountParams => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isAdmin: faker.random.boolean() 
})

export const mockAuthenticationParams = ():AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = ():AuthenticationModel => ({
  accessToken: faker.random.word(),
  name: faker.internet.userName()
})
