"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

const Header = () => {
  const pathname = usePathname();
  const [cart, _] = useCart();

  return (
    <div className="">
      <h1>Header</h1>
      <p>Current pathname: {pathname}</p>
      {/* {pathname !== "/basket" ? (
        <Link href="/basket">Basket</Link>
      ) : (
        <Link href="/">Home</Link>
      )} */}
      {pathname !== "/" && <Link href="/">Home</Link>}
      {pathname !== "/basket" && (
        <Link href="/basket">
          Basket <span>{cart.products.length}</span>
        </Link>
      )}
      {/* {pathname.includes('product') && <Link href="/basket">Basket</Link>} */}
    </div>
  );
};

export default Header;
