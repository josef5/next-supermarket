"use client";
import { type Cart } from "@/api/types";
import { useCart } from "./CartContext";
import { currencyFormat } from "@/api/cart";
import PictureIcon from "./icons/PictureIcon";
import Link from "next/link";

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
      <h2 className="text-xl font-bold">Basket</h2>

      {cart.items.length > 0 ? (
        <>
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="grid gap-2 mb-2 md:gap-4 grid-cols-1 min-[500px]:grid-cols-2 items-center"
            >
              <div className="flex items-center gap-4">
                <Link
                  href={`/product/${item.id}`}
                  className="min-[500px]:inline-block"
                >
                  <div className="w-12 h-12">
                    <PictureIcon />
                  </div>
                </Link>
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-bold">{item.name}</h3>
                </Link>
              </div>
              <div className="flex justify-end gap-4 items-center">
                <input
                  type="number"
                  className="max-w-[50px] text-center border rounded"
                  defaultValue={item.quantity}
                  onChange={async (event) => {
                    setCart(
                      await updateCartQuantityAction(
                        item.id,
                        +event.target.value
                      )
                    );
                  }}
                />
                <p className="justify-end text-end text-sm md:text-base min-w-[100px]">
                  {currencyFormat.format(item.price)} each
                </p>
                <p className="font-bold justify-end text-end  min-w-[70px]">
                  {currencyFormat.format(item.subtotal)}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <h3 className="font-bold">
              Total: {currencyFormat.format(cart.total)}
            </h3>
          </div>
        </>
      ) : (
        <p>Your basket is empty</p>
      )}

      {cart.itemsNum > 0 && (
        <div className="flex justify-end mt-6 gap-4">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full text-xs"
            onClick={async () => {
              setCart(await clearCartAction());
            }}
          >
            Clear Basket
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded-full text-xs min-w-[100px]">
            Checkout
          </button>
        </div>
      )}
      {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
    </div>
  );
};

export default Basket;
