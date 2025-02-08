"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-background text-white shadow-lg relative">
      <div className="w-full mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          
            <div className="text-xl font-bold text-color-text-red"><Link href="/">Logo</Link></div>
          
          {/* Länkar från tablet och uppåt */}
          <div className="hidden md:flex md:gap-4 md:pr-4 text-black font-semibold text-lg items-center content-center">
            <Link href="/" className={`${pathname === "/" ? "active" : ""}`}>
              Hem
            </Link>

            <Link
              data-test="Menu"
              href="/Menu"
              className={`${pathname === "/Menu" ? "active" : ""}`}
            >
              Meny
            </Link>
          </div>
          {/* Hamburger Menu Button (for mobile) */}
          <div className="md:hidden">
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
                // onClick={() => setMenuOpen(!menuOpen)}
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
