export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  }
  

  export type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };