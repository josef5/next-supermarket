import Link from "next/link";

const ProductListItem = ({ product }: any) => {
  return (
    <div key={product.id}>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <Link href={`/product/${product.id}`}>More details</Link>
    </div>
  );
};

export default ProductListItem;
