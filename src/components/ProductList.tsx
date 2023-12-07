import Link from "next/link";
import { Product } from "@/api/types";
import { addToCart } from "@/api/cart";
import AddToCart from "./AddToCart";

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
          <p>{product.price}</p>
          <AddToCart
            addToCartAction={async () => {
              "use server";
              return await addToCartAction(product.id);
            }}
          />
          <Link href={`/product/${product.id}`}>More details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
