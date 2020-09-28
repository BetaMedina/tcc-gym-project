import { JwtAdapter } from '@data/protocols/encrypter/hash-jwt'
import { ENUM } from '../cryptography-enum/enum-crypt'
import jwt from 'jsonwebtoken'
import { Decrypter } from '@data/protocols/encrypter/decrypt'

export class JsonWebTokenAdapter implements JwtAdapter, Decrypter {
  async hashGenerate (id:number):Promise<string> {
    return jwt.sign({ id }, ENUM.JWT_SECRET, { expiresIn: ENUM.JWT_TIME })     
  }

  async decrypt (ciphertext: string): Promise<string> {
    const plaintext: any = await jwt.verify(ciphertext, ENUM.JWT_SECRET)
    return plaintext
  }
}
