import Link from "next/link";
import { Product } from "@/api/types";

const ProductList = async ({ products }: { products: Product[] }) => {
  return (
    <div>
      <p>Product List</p>
      {products.map((product: any) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <Link href={{ pathname: `/product/${product.id}` }}>
            More details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
