import { Product } from "./types";

/**
 * Retrieves all products from the server.
 * @returns A Promise that resolves to an array of products.
 */

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

/**
 * Retrieves a product by its ID.
 * @param id - The ID of the product to retrieve.
 * @returns A Promise that resolves to the product with the specified ID, or undefined if not found.
 */

export const getProductById = async (
  id: number
): Promise<Product | undefined> =>
  getProducts().then((products) => {
    return products.find((p) => p.id === id);
  });
