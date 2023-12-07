"use client";
import { type Cart } from "@/api/types";
import { useCart } from "./CartContext";
import { currencyFormat } from "@/api/cart";

/**
 * The Basket displays the items in the cart and allows the user to update quantities and clear the cart.
 * @param updateCartQuantityAction - A function that updates the quantity of a product in the cart and returns a Promise of the updated cart.
 * @param clearCartAction - A function that clears the cart and returns a Promise of the updated cart.
 */

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
              <p>{currencyFormat.format(item.price)}</p>
              <p>{currencyFormat.format(item.subtotal)}</p>
            </div>
          ))}
          <h3>Total: {currencyFormat.format(cart.total)}</h3>
        </>
      ) : (
        <p>Your basket is empty</p>
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
