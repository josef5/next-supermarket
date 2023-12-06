import { useRouter } from "next/navigation";
import ProductDetail from "../../../components/ProductDetail";

const ProductPage = ({ params }: { params: { productId: string } }) => {
  return <ProductDetail id={params.productId} />;
};

export default ProductPage;
