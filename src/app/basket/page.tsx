import { clearCart } from "@/api/cart";
import Basket from "@/components/Basket";

const clearCartAction = async () => {
  "use server";
  return await clearCart();
};

const Page = () => {
  return <Basket clearCartAction={clearCartAction} />;
};

export default Page;
