"use client";
import { type Cart } from "@/api/types";
import { useCart } from "./CartContext";
import Link from "next/link";

const Basket = () => {
  const [cart, _] = useCart();

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
    </div>
  );
};

export default Basket;
