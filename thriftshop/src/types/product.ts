export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
  }
  

  export type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };