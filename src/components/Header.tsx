"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { currencyFormat } from "@/api/cart";

const Header = () => {
  const pathname = usePathname();
  const [cart] = useCart();

  return (
    <div className="">
      <h1>Header</h1>

      {pathname !== "/" && (
        <>
          <Link href="/">Home</Link>&nbsp;
        </>
      )}

      {pathname !== "/basket" && (
        <Link href="/basket">
          Basket <span>({cart.itemsNum})</span>{" "}
          <span>{currencyFormat.format(cart.total)}</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
