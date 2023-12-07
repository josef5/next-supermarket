"use client";
import { type Cart } from "@/api/types";
import { useCart } from "./CartContext";

/**
 * This component represents a button to add an item to the cart. It is a client-side component but is intended for use by server-side components.
 * @param addToCartAction - A function that adds an item to the cart and returns a Promise of the updated cart.
 */

export default function AddToCartButton({
  addToCartAction,
}: {
  addToCartAction: () => Promise<Cart>;
}) {
  const [_, setCart] = useCart();

  return (
    <button
      className=""
      onClick={async () => {
        setCart(await addToCartAction());
      }}
    >
      Add To Cart
    </button>
  );
}
