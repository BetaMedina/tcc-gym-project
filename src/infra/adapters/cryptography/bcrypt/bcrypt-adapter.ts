import { Compare, Encrypter } from '@data/protocols/encrypter/encrypt'
import { ENUM } from '../cryptography-enum/enum-crypt'
import bcrypt from 'bcrypt'

export class BcrypAdapter implements Encrypter, Compare {
  encrypt (itemToEncrypt: string):Promise<string> {
    return bcrypt.hash(itemToEncrypt, ENUM.BCRYPT_HASH)
  }

  compare (itemToEncrypt: string, hashEncrypt:string):Promise<boolean> {
    return bcrypt.compare(itemToEncrypt, hashEncrypt)
  }
}
