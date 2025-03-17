"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart(); // Hämta totalItems från CartContext

  return (
    <nav className="bg-background text-white shadow-lg relative">
      <div className="w-full mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="text-xl font-bold text-color-text-red">
            <Link href="/" aria-label="Gå till startsida">Logo</Link>
          </div>

          {/* Länkar från tablet och uppåt */}
          <div className="hidden md:flex md:gap-4 md:pr-4 text-black font-semibold text-lg items-center content-center">
            <Link href="/" aria-label="Gå till startsida" className={`${pathname === "/" ? "active" : ""}`}>
              Hem
            </Link>

            <Link
              data-test="Menu"
              href="/Menu" aria-label="Gå till meny"
              className={`${pathname === "/Menu" ? "active" : ""}`}
            >
              Meny
            </Link>

            {/* Cart icon desktop */}
            <Link
              href="/cart" aria-label="Gå till kundvagn"
              className="relative flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                 aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-color-text-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Hamburger Menu Button (for mobile) */}
          <div className="md:hidden flex items-center">

            {/* Cart icon mobile */}
            <Link
              href="/cart"
              className="relative flex items-center mr-4"
              aria-label="Kundvagn" 
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-color-text-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
              className="text-black focus:outline-none w-full"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>

            {menuOpen ? (
              <div
                data-testid="mobile-menu"
                className="md:hidden flex flex-col bg-color-hamburger-bg text-black font-semibold p-4 absolute top-20 right-4 left-1/2 text-center rounded-lg border-color-text-red border-2 border-dotted"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Link
                  data-testid="mobile-menu-link"
                  href="/"
                  className={`${pathname === "/" ? "active" : ""}`}
                >
                  Hem
                </Link>
                <Link
                  data-testid="mobile-menu-link"
                  href="/Menu"
                  className={`${pathname === "/Menu" ? "active" : ""}`}
                >
                  Meny
                </Link>
                <Link
                  data-testid="mobile-menu-link"
                  href="/cart"
                  className={`${pathname === "/cart" ? "active" : ""}`}
                >
                  Kundvagn {totalItems > 0 && `(${totalItems})`}
                </Link>
              </div>
            ) : (
              <ul className="hidden"></ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}