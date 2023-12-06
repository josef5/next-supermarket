import { useRouter } from "next/navigation";
import ProductDetail from "../../../components/ProductDetail";

const ProductPage = ({ searchParams }: { searchParams: { id: string } }) => {
  return <ProductDetail id={searchParams.id} />;
};

export default ProductPage;
