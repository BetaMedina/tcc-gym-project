import { Compare, Encrypter } from '@data/protocols/encrypter/encrypt'
import { JwtAdapter } from '@data/protocols/encrypter/hash-jwt'

export class HashStub implements Encrypter {
  encrypt (plaintext: string):Promise<string> {
    return new Promise(resolve => resolve('hashpassword'))
  }
}

export class JwtAdapterStub implements JwtAdapter {
  async hashGenerate (id:number):Promise<string> {
    return 'hashedPassword'
  } 
}

export class EncryptStub implements Compare {
  compare (email:string):Promise<boolean> {
    return new Promise(resolve => resolve(true)) 
  } 
}

export class DecryptStub implements Compare {
  compare (email:string):Promise<boolean> {
    return new Promise(resolve => resolve(true)) 
  } 
}
