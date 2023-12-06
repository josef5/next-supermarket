export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
}

export interface Cart {
  products: {
    id: number;
    name: string;
    image: string;
    price: number;
  }[];
}
