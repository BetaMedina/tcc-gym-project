  
export interface Encrypter {
  encrypt (plaintext: string):Promise<string>
}

export interface Compare {
  compare (plaintext: string, hashEncrypt:string):Promise<boolean>
}
