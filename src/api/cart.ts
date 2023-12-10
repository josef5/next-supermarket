import { getProductById } from "./products";
import { Cart } from "./types";

const cart: Cart = {
  items: [],
  itemsNum: 0,
  total: 0,
};

/**
 * Format a number as currency in GBP.
 * @param {number} value - The number to be formatted as currency.
 * @returns {string} - The formatted currency string.
 */
export const currencyFormat = new Intl.NumberFormat("en-UK", {
  style: "currency",
  currency: "GBP",
});

// Expose the cart object to the client
export const getCart = async (): Promise<Cart> => {
  return cart;
};

/**
 * Calculate the total value of all items in the cart.
 * @param {Cart} cart - The cart object containing the items.
 * @returns {number} - The total value of all items in the cart.
 */
const calculateTotal = (cart: Cart): number => {
  return cart.items.reduce(
    (accumulator, currentItem) => accumulator + currentItem.subtotal,
    0
  );
};

/**
 * Get the total number of items in the cart.
 * @param {Cart} cart - The cart object containing the items.
 * @returns {number} - The total number of items in the cart.
 */
const getItemsTotal = (cart: Cart): number => {
  return cart.items.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );
};

/**
 * Add a product to the cart.
 * @param {number} productId - The ID of the product to be added to the cart.
 * @returns {Promise<Cart>} - The updated cart after adding the product.
 */
export const addToCart = async (productId: number): Promise<Cart> => {
  const item = cart.items.find((item) => item.id === productId);
  const newQuantity = item ? item.quantity + 1 : 1;

  updateCartQuantity(productId, newQuantity);

  return cart;
};

/**
 * Update the quantity of a product in the cart.
 * @param {number} productId - The ID of the product to be updated.
 * @param {number} newQuantity - The new quantity of the product.
 * @returns {Promise<Cart>} - The updated cart after updating the quantity.
 */
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

/**
 * Clear the cart by removing all items and resetting the total and itemsNum.
 * @returns {Promise<Cart>} - The cleared cart.
 */
export const clearCart = async (): Promise<Cart> => {
  cart.items = [];
  cart.total = calculateTotal(cart);
  cart.itemsNum = getItemsTotal(cart);

  return cart;
};
