import Link from "next/link";
import { Product } from "@/api/types";
import { addToCart, currencyFormat } from "@/api/cart";
import AddToCartButton from "./AddToCartButton";
import PictureIcon from "./icons/PictureIcon";

/**
 * Displays a list of products.
 */
const ProductList = async ({ products }: { products: Product[] }) => {
  const addToCartAction = async (id: number) => {
    "use server";
    return await addToCart(id);
  };

  return (
    <div className="">
      <h2 className="flex font-bold">Products</h2>
      <div className="flex flex-col gap-y-5 sm:gap-y-2">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="grid sm:grid-cols-[auto_max-content] gap-x-4 items-center"
          >
            <Link href={`/product/${product.id}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12">
                  <PictureIcon />
                </div>
                <h3 className="font-semibold">{product.name}</h3>
              </div>
            </Link>
            <div className="flex items-center gap-4 justify-end">
              <p className="">{currencyFormat.format(product.price)}</p>
              <Link
                href={`/product/${product.id}`}
                className="text-blue-500 underline"
              >
                More details
              </Link>
              <AddToCartButton
                addToCartAction={async () => {
                  "use server";
                  return await addToCartAction(product.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
