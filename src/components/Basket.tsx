"use client";
import { type Cart } from "@/api/types";
import { useCart } from "./CartContext";
import Link from "next/link";

const Basket = ({
  clearCartAction,
}: {
  clearCartAction: () => Promise<Cart>;
}) => {
  const [cart, setCart] = useCart();

  return (
    <div className="">
      <h2>Basket</h2>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      {/* {cart.products.length > 0 && (
        <>
          {cart.products.map((product, index) => (
            <div key={product.id}>
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </>
      )} */}
      {/* <Link href="/">Home</Link> */}
      {cart.itemsNum > 0 && (
        <button
          className=""
          onClick={async () => {
            setCart(await clearCartAction());
          }}
        >
          Clear Basket
        </button>
      )}
    </div>
  );
};

export default Basket;
