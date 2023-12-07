"use client";
import { type Cart } from "@/api/types";
import { useCart } from "./CartContext";
import { currencyFormat } from "@/api/cart";

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
