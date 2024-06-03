import {Goods, Cart, User, Category,CartGoodsList } from "@/store/types";

export function saveGoods(goods: Goods[]) {
  localStorage.setItem('goods', JSON.stringify(goods))
}

export function readGoods(): Goods[] {
  return JSON.parse(localStorage.getItem('goods') || '[]')
}

export function saveCart(cart: Cart[]) {

  const goods: Goods[] = readGoods();
  const result = cart.map((item: Cart) => {
    const goodItem = goods.find(goodsItem => goodsItem.id === item.id);
    return {
      ...item,
      ...goodItem
    } as CartGoodsList;
  });
  localStorage.setItem('cart', JSON.stringify(result))
}

export function readCart(): CartGoodsList[] {
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

