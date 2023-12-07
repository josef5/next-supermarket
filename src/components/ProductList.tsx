import Link from "next/link";
import { Product } from "@/api/types";
import { addToCart, currencyFormat } from "@/api/cart";
import AddToCartButton from "./AddToCartButton";

/**
 * Displays a list of products.
 */

const ProductList = async ({ products }: { products: Product[] }) => {
  const addToCartAction = async (id: number) => {
    "use server";
    return await addToCart(id);
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product: any) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{currencyFormat.format(product.price)}</p>
          <AddToCartButton
            addToCartAction={async () => {
              "use server";
              return await addToCartAction(product.id);
            }}
          />
          &nbsp;
          <Link href={`/product/${product.id}`}>More details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
