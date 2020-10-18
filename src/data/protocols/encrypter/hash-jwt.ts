export interface JwtAdapter{
  hashGenerate (id:number, isAdmin?:boolean):Promise<string> 
}
