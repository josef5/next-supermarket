export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
}

type CartItem = Product & { quantity: number; subtotal: number };

export interface Cart {
  items: CartItem[];
  itemsNum: number;
  total: number;
}
