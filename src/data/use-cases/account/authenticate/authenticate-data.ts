import { Compare } from '@data/protocols/encrypter/encrypt'
import { JwtAdapter } from '@data/protocols/encrypter/hash-jwt'
import { LoadAccountByEmailRepository } from '@data/protocols/account/load-account-email'
import { AuthenticationModel } from '@domain/models/account/authentication'
import { Authentication, AuthenticationParams } from '@domain/use-cases/account/authenticated'

export class AuthenticationData implements Authentication {
  constructor (private readonly encrypt :Compare, private readonly findByMail:LoadAccountByEmailRepository, private readonly jwtAdapter :JwtAdapter) {}

  async auth (authenticationParams: AuthenticationParams):Promise<AuthenticationModel> {
    const dbResponse = await this.findByMail.loadByEmail(authenticationParams.email)
    if (!dbResponse) {
      return null
    }

    if (!(await this.encrypt.compare(authenticationParams.password, dbResponse.password))) {
      return null
    }
    const encryptToken = await this.jwtAdapter.hashGenerate(Number(dbResponse.id))
    return {
      accessToken: encryptToken,
      name: dbResponse.name,
      isAdmin:dbResponse.isAdmin
    }
  }
}
