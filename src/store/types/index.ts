export interface Goods {
  id: number, //商品id
  category: string, //商品類別
  name: string, //商品名稱
  money: number, //商品價格
  introduce: string, //商品介紹
  image: string, //商品圖片
  stock: number, //商品庫存
  sale: number //商品已銷售數量
}

export interface Cart {
  id: number, //商品id
  count: number // 所選的商品數量
}

export interface User {
  email: string,
  password: string
}

export interface Category {
  id: number,
  name: string
}

export interface CartGoodsList extends Cart, Goods { }

interface FormField {
  name: string;
  inputType: string;
  placeholder: string;
  error: string;
  isInput: boolean;
  regExp: RegExp;
  value: string;
  isValid: boolean;
}

export interface LoginForm {
  email: FormField;
  password: FormField;
}

export interface SignForm {
  email: FormField;
  password: FormField;
  confirm: FormField;
}

export interface ResetPasswordForm {
  email: FormField;
  password: FormField;
  confirm: FormField;
}

export interface Popup {
  title: string,
  content: string,
  button: string,
  type?: 'success' | 'error' | 'warning',
  dialog: boolean
}

export interface News {
  id: string,
  name: string,
  content: string,
  image: string,
  date: string
}
