export interface Todo{
  id:number,
  content:string,
  done:boolean
}

export interface Goods{
  id:number,
  categroy:string,
  name:string,
  money:number,
  introduce:string,
  stock:number
}

export interface Cart{
  id:number,
  name:string,
  money:number,
  stock:number,
  count:number
}