import { getProductById } from "./products";
import { Cart } from "./types";

const cart: Cart = {
  items: [],
  itemsNum: 0,
  total: 0,
};

export const getCart = async (): Promise<Cart> => {
  return cart;
};

const calculateTotal = (cart: Cart): number => {
  return cart.items.reduce(
    (accumulator, currentItem) => accumulator + currentItem.subtotal,
    0
  );
};

const getItemsTotal = (cart: Cart): number => {
  return cart.items.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );
};

export const addToCart = async (productId: number): Promise<Cart> => {
  const product = await getProductById(productId);

  if (product) {
    if (!cart.items.some((item) => item.id === product.id)) {
      cart.items.push({ ...product, quantity: 1, subtotal: product.price });
    } else {
      const index = cart.items.findIndex((item) => item.id === product.id);
      cart.items[index].quantity += 1;
      cart.items[index].subtotal += product.price;
    }
  }

  cart.itemsNum = getItemsTotal(cart);
  cart.total = calculateTotal(cart);

  return cart;
};

export const clearCart = async (): Promise<Cart> => {
  cart.items = [];
  cart.total = calculateTotal(cart);
  cart.itemsNum = getItemsTotal(cart);

  return cart;
};
