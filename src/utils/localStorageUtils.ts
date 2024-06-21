import { Goods, Cart, User, Category, CartGoodsList, News } from "@/store/types";

/**
 * 儲存商品
 * @param goods
 */
export function saveGoods(goods: Goods[]) {
  localStorage.setItem('goods', JSON.stringify(goods))
}

/**
 * 取得商品
 * @returns 商品
 */
export function readGoods(): Goods[] {
  return JSON.parse(localStorage.getItem('goods') || '[]')
}

/**
 * 儲存購物車
 * @param cart
 */
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

/**
 * 讀取購物車
 * @returns 購物車
 */
export function readCart(): CartGoodsList[] {
  return JSON.parse(localStorage.getItem('cart') || '[]')
}

/**
 * 儲存使用者
 * @param user
 */
export function saveUser(user: User[]) {
  localStorage.setItem('user', JSON.stringify(user))
}

/**
 * 讀取使用者
 * @returns 使用者
 */
export function readUser(): User[] {
  return JSON.parse(localStorage.getItem('user') || '[]')
}

/**
 * 使用者登入
 * @param userLogin
 */
export function userLogin(userLogin: User) {
  localStorage.setItem('userLogin', JSON.stringify(userLogin))
}

/**
 * 讀取使用者列表
 * @returns 使用者列表
 */
export function readUserLogin(): User {
  return JSON.parse(localStorage.getItem('userLogin') || '{}')
}

/**
 * 使用者登出
 */
export function userSignOut() {
  localStorage.removeItem('userLogin')
}

/**
 * 儲存類別
 * @param category
 */
export function saveCategory(category: Category[]) {
  localStorage.setItem('category', JSON.stringify(category))
}

/**
 * 讀取類別
 * @returns
 */
export function readCategory(): Category[] {
  return JSON.parse(localStorage.getItem('category') || '[]')
}

/**
 * 儲存消息
 * @param data
 */
export function saveNewItem(data: News) {
  localStorage.setItem('news', JSON.stringify(data))
}

/**
 * 讀取消息
 * @returns 消息
 */
export function readNewsItem(): News {
  return JSON.parse(localStorage.getItem('news') || '{}')
}


/**
 * 儲存購買紀錄
 * @param data
 */
export function saveBuyHistory(data: CartGoodsList[]) {
  localStorage.setItem('history', JSON.stringify(data))
}

/**
 * 讀取購買紀錄
 * @returns 購買紀錄
 */
export function readBuyHistory() {
  return JSON.parse(localStorage.getItem('history') || '[]')
}

