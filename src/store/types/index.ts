export interface Todo{
  id:number,
  content:string,
  done:boolean
}

export interface Goods{
  id:number,
  category:string,
  name:string,
  money:number,
  introduce:string,
  image:string,
  stock:number
}

export interface Cart{
  id:number,
  category:string,
  name:string,
  money:number,
  introduce:string,
  image:string,
  stock:number,
  count:number
}

export interface User{
  email:string,
  password:string
}

export interface Category{
  id:number,
  name:string
}