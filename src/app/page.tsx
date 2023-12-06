import Image from "next/image";
import styles from "./page.module.css";
import ProductList from "./../components/ProductList";
import { getProducts } from "@/api/products";

export default async function Home() {
  const products = await getProducts();

  return <ProductList products={products} />;
}
