"use client";

import React, { createContext, useState } from "react";
import { type Cart } from "@/api/types";

const useCartState = (initialCart: Cart) => useState<Cart>(initialCart);

/**
 * Context for cart state
 */
const CartContext = createContext<ReturnType<typeof useCartState> | null>(null);

/**
 * Provider component that supplies the cart state to the rest of the application.
 * @param cart - The initial cart state.
 * @param children - The child components to be rendered within the provider.
 */
export const CartProvider = ({
  cart: initialCart,
  children,
}: {
  cart: Cart;
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useCartState(initialCart);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook that provides access to the cart context.
 * @returns The current cart state and a function to update the cart state.
 */
export const useCart = () => {
  const cart = React.useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return cart;
};

export default CartContext;
