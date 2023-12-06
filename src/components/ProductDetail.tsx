import { getProductById } from "@/api/products";
import Link from "next/link";

const ProductDetail = async ({ id }: { id: string }) => {
  console.log("id :", id);
  const product = await getProductById(+id);
  console.log("product :", product);

  return (
    <div key={product?.id}>
      <p>{product?.name}</p>
      <p>{product?.description}</p>
      <p>{product?.price}</p>
      <Link href={`/`}>Back</Link>
    </div>
  );
};

export default ProductDetail;
