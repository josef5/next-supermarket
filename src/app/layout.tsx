import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { getCart, clearCart } from "@/api/cart";
import { CartProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/**
 * Root layout of the application. Contains fixed elements header and footer.
 * @param children - The child components to be rendered within the layout.
 */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = await getCart();

  return (
    <html lang="en" className="h-full">
      <body className={`${roboto.className} h-full flex flex-col `}>
        <CartProvider cart={cart}>
          <div className="flex-[1_0_auto] mx-6 mb-12">
            <Header />
            <main>{children}</main>
          </div>
          <div className="shrink-0">
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
