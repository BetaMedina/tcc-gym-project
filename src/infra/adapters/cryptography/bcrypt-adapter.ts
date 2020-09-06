import { Encrypter } from '@data/protocols/encrypt'
import bcrypt from 'bcrypt'
export class BcrypAdapter implements Encrypter {
  encrypt (itemToEncrypt: string):Promise<string> {
    return bcrypt.hash(itemToEncrypt, 10)
  }
}
