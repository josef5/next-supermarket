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
  const item = cart.items.find((item) => item.id === productId);
  const newQuantity = item ? item.quantity + 1 : 1;

  updateCartQuantity(productId, newQuantity);

  return cart;
};

export const updateCartQuantity = async (
  productId: number,
  newQuantity: number
): Promise<Cart> => {
  const product = await getProductById(productId);

  if (product) {
    if (cart.items.some((item) => item.id === product.id)) {
      const index = cart.items.findIndex((item) => item.id === product.id);

      if (newQuantity > 0) {
        cart.items[index].quantity = newQuantity;
        cart.items[index].subtotal = newQuantity * product.price;
      } else {
        cart.items.splice(index, 1);
      }
    } else {
      cart.items.push({ ...product, quantity: 1, subtotal: product.price });
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
