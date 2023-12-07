"use client";
import { type Cart } from "@/api/types";
import { useCart } from "./CartContext";

export default function AddToCart({
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
