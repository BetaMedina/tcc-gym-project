export interface JwtAdapter{
  hashGenerate (id:number):Promise<string> 
}
