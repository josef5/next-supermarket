import React from "react";
import Header from "./Header";
import { CartProvider } from "./CartContext";
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

describe("<Header />", () => {
  it("renders", () => {
    cy.mount(
      <CartProvider cart={cart}>
        <Header />
      </CartProvider>
    );

    cy.contains("Awesome").should("exist");
  });
});
