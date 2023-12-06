import { Product } from "./types";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getProductById = async (
  id: number
): Promise<Product | undefined> =>
  getProducts().then((products) => {
    console.log("products :", products);

    return products.find((p) => p.id === id);
  });
