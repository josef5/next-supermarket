"use client";
import { type Cart } from "@/api/types";
import { useCart } from "./CartContext";
import Link from "next/link";

const Basket = ({
  updateCartQuantityAction,
  clearCartAction,
}: {
  updateCartQuantityAction: (
    productId: number,
    newQuantity: number
  ) => Promise<Cart>;
  clearCartAction: () => Promise<Cart>;
}) => {
  const [cart, setCart] = useCart();

  return (
    <div className="">
      <h2>Basket</h2>

      {cart.items.length > 0 ? (
        <>
          {cart.items.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <input
                type="number"
                defaultValue={item.quantity}
                onChange={async (event) => {
                  setCart(
                    await updateCartQuantityAction(item.id, +event.target.value)
                  );
                }}
              />
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
