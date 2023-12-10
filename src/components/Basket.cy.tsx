import React from "react";
import { clearCart, updateCartQuantity } from "@/api/cart";
import { CartProvider } from "@/components/CartContext";
import Basket from "./Basket";
import { Cart } from "@/api/types";

const cart: Cart = {
  items: [
    {
      id: 1,
      name: "Test Product",
      description: "",
      image: "",
      price: 1.23,
      subtotal: 1.23,
      quantity: 1,
    },
  ],
  itemsNum: 1,
  total: 1.23,
};

describe("<Basket />", () => {
  const updateCartQuantityAction = async (
    productId: number,
    newQuantity: number
  ) => {
    return await updateCartQuantity(productId, newQuantity);
  };

  const clearCartAction = async () => {
    return await clearCart();
  };

  /**
   * Renders the component.
   */
  it("renders", async () => {
    cy.mount(
      <CartProvider cart={cart}>
        <Basket
          updateCartQuantityAction={updateCartQuantityAction}
          clearCartAction={clearCartAction}
        />
      </CartProvider>
    );
  });

  /**
   * This test checks if the Basket component contains the test product.
   */
  it("contains test product", async () => {
    cy.mount(
      <CartProvider cart={cart}>
        <Basket
          updateCartQuantityAction={updateCartQuantityAction}
          clearCartAction={clearCartAction}
        />
      </CartProvider>
    ).then(() => {
      cy.contains("Test Product").should("exist");
    });
  });

  /**
   * Clears the items in the cart.
   */
  it("clears items", async () => {
    cy.mount(
      <CartProvider cart={cart}>
        <Basket
          updateCartQuantityAction={updateCartQuantityAction}
          clearCartAction={clearCartAction}
        />
      </CartProvider>
    ).then(() => {
      cy.contains("Clear").click();
    });
  });
});
