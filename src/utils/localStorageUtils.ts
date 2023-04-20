import {Todo,Goods,Cart} from "@/store/types";

export function saveTodos(todos:Todo[]){
  localStorage.setItem('todos_key',JSON.stringify(todos))
}

export function readTodos():Todo[]{
  return JSON.parse(localStorage.getItem('todos_key')||'[]')
}

export function saveGoods(goods:Goods[]){
  localStorage.setItem('goods',JSON.stringify(goods))
}

export function readGoods():Goods[]{
  return JSON.parse(localStorage.getItem('goods')||'[]')
}

export function saveCart(cart:Cart[]){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export function readCart():Cart[]{
  return JSON.parse(localStorage.getItem('cart')||'[]')
}