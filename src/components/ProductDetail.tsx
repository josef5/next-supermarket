import { addToCart, currencyFormat } from "@/api/cart";
import { getProductById } from "@/api/products";
import AddToCartButton from "./AddToCartButton";

const ProductDetail = async ({ id }: { id: string }) => {
  const product = await getProductById(+id);

  const addToCartAction = async () => {
    "use server";
    return await addToCart(+id);
  };

  return product ? (
    <div key={product.id}>
      <h2>Product Detail</h2>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{currencyFormat.format(product.price)}</p>
      <AddToCartButton addToCartAction={addToCartAction} />
    </div>
  ) : (
    <p>Product not found</p>
  );
};

export default ProductDetail;
