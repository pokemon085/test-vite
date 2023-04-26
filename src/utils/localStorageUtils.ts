import { Todo, Goods, Cart, User, Category } from "@/store/types";

export function saveTodos(todos: Todo[]) {
  localStorage.setItem('todos_key', JSON.stringify(todos))
}

export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('todos_key') || '[]')
}

export function saveGoods(goods: Goods[]) {
  localStorage.setItem('goods', JSON.stringify(goods))
}

export function readGoods(): Goods[] {
  return JSON.parse(localStorage.getItem('goods') || '[]')
}

export function saveCart(cart: Cart[]) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function readCart(): Cart[] {
  return JSON.parse(localStorage.getItem('cart') || '[]')
}

export function saveUser(user: User[]) {
  localStorage.setItem('user', JSON.stringify(user))
}
export function readUser(): User[] {
  return JSON.parse(localStorage.getItem('user') || '[]')
}

export function userLogin(userLogin: User) {
  localStorage.setItem('userLogin', JSON.stringify(userLogin))
}

export function readUserLogin(): User {
  return JSON.parse(localStorage.getItem('userLogin') || '{}')
}

export function userSignOut() {
  localStorage.removeItem('userLogin')
}

export function saveCategory(category: Category[]) {
  localStorage.setItem('category', JSON.stringify(category))
}

export function readCategory(): Category[] {
  return JSON.parse(localStorage.getItem('category') || '[]')
}

