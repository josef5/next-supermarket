import { clearCart, updateCartQuantity } from "@/api/cart";
import Basket from "@/components/Basket";

/**
 * Updates the quantity of a product in the cart.
 * @param productId - The ID of the product to update.
 * @param newQuantity - The new quantity of the product.
 * @returns A promise that resolves with the updated cart.
 */

const updateCartQuantityAction = async (
  productId: number,
  newQuantity: number
) => {
  "use server";
  return await updateCartQuantity(productId, newQuantity);
};

/**
 * Clears the entire cart.
 * @returns A promise that resolves with the cleared cart.
 */

const clearCartAction = async () => {
  "use server";
  return await clearCart();
};

const Page = () => {
  return (
    <Basket
      updateCartQuantityAction={updateCartQuantityAction}
      clearCartAction={clearCartAction}
    />
  );
};

export default Page;
