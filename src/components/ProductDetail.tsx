import { addToCart, currencyFormat } from "@/api/cart";
import { getProductById } from "@/api/products";
import AddToCartButton from "./AddToCartButton";
import PictureIcon from "./icons/PictureIcon";

/**
 * Product detail component containing product data and description.
 */
const ProductDetail = async ({ id }: { id: string }) => {
  const product = await getProductById(+id);

  const addToCartAction = async () => {
    "use server";
    return await addToCart(+id);
  };

  return product ? (
    <div key={product.id}>
      <h2 className="text-xl font-bold">{product.name}</h2>
      <div className="w-full">
        <div className="flex w-1/2 justify-start">
          <PictureIcon />
        </div>
        <p className="mb-6">{product.description}</p>
        <p className="flex-1 font-bold mb-6">
          {currencyFormat.format(product.price)}
        </p>

        <AddToCartButton addToCartAction={addToCartAction} />
      </div>
    </div>
  ) : (
    <p>Product not found</p>
  );
};

export default ProductDetail;
