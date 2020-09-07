import { JwtAdapter } from '@data/protocols/encrypter/hash-jwt'
import { ENUM } from '../cryptography-enum/enum-crypt'
import jwt from 'jsonwebtoken'

export class JsonWebTokenAdapter implements JwtAdapter {
  async hashGenerate (id:number):Promise<string> {
    return jwt.sign({ id }, ENUM.JWT_SECRET, { expiresIn: ENUM.JWT_TIME })     
  }
}
