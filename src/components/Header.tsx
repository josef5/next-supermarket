"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { currencyFormat } from "@/api/cart";
import Logo from "./icons/Logo";

/**
 * Header component containing nav and cart total.
 */
const Header = () => {
  const pathname = usePathname();
  const [cart] = useCart() ?? [];

  if (!cart) {
    throw new Error("No cart set");
    return;
  }

  return (
    <div className="flex items-center h-32 gap-4">
      <div className="w-8 md:w-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex-1">
        <Link href="/">
          <h1 className="font-bold text-base/4 min-[400px]:text-2xl/6 min-[600px]:text-3xl">
            Awesome Supermarket
          </h1>
        </Link>
      </div>
      <div className="flex flex-col min-[500px]:flex-row items-end text-sm min-[500px]:text-base min-[500px]:flex-nowrap gap-x-4">
        {pathname !== "/" && (
          <>
            <Link href="/" className="underline text-blue-500">
              Home
            </Link>
          </>
        )}
        {pathname !== "/basket" && cart && (
          <Link
            href="/basket"
            className="flex justify-end underline text-blue-500 md:ml-2 text-right flex-wrap"
          >
            Basket&nbsp;<span>({cart.itemsNum})</span> &nbsp;
            <span>{currencyFormat.format(cart.total)}</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
