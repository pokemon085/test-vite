export interface Goods {
  id: number,
  category: string,
  name: string,
  money: number,
  introduce: string,
  image: string,
  stock: number
}

export interface Cart {
  id: number,
  count: number
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
  type?: 'success' | 'error' | 'warning'
}
