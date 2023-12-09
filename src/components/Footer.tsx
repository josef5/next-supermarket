"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center h-32 gap-4 bg-gray-200 px-6">
      {pathname !== "/" && (
        <>
          <Link href="/" className="text-gray-500">
            Home
          </Link>
        </>
      )}
      {pathname !== "/basket" && (
        <Link
          href="/basket"
          className="flex justify-end text-gray-500 md:ml-2 text-right flex-wrap"
        >
          Basket
        </Link>
      )}
    </div>
  );
};

export default Footer;
