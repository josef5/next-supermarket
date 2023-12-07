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

      {cart.items.length > 0 && (
        <>
          {cart.items.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              {/* <p>{item.quantity}</p> */}
              <input type="number" defaultValue={item.quantity} />
              <p>{item.price}</p>
              <p>{item.subtotal}</p>
            </div>
          ))}
        </>
      )}

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
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
};

export default Basket;
