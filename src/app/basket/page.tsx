import { clearCart, updateCartQuantity } from "@/api/cart";
import Basket from "@/components/Basket";

const updateCartQuantityAction = async (
  productId: number,
  newQuantity: number
) => {
  "use server";
  return await updateCartQuantity(productId, newQuantity);
};

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
