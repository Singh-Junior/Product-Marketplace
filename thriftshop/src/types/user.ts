export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  token?: string;
  cart: CartItem[];         // updated to store detailed product info with quantity
  boughtItems?: number[];   // remains unchanged for now
}
