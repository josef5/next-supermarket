import { addToCart } from "@/api/cart";
import { getProductById } from "@/api/products";
import Link from "next/link";
import AddToCart from "./AddToCart";

const ProductDetail = async ({ id }: { id: string }) => {
  const product = await getProductById(+id);

  const addToCartAction = async () => {
    "use server";
    return await addToCart(+id);
  };

  return (
    <div key={product?.id}>
      <h2>Product Detail</h2>
      <p>{product?.name}</p>
      <p>{product?.description}</p>
      <p>{product?.price}</p>
      <AddToCart addToCartAction={addToCartAction} />
      <br />
      {/* <Link href={`/`}>Back</Link> */}
    </div>
  );
};

export default ProductDetail;
