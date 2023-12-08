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
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full text-xs min-w-[120px]"
      onClick={async () => {
        setCart(await addToCartAction());
      }}
    >
      Add To Cart
    </button>
  );
}
