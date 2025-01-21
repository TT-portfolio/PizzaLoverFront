"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import { useApi } from "@/context/ApiContext";

export default function Navbar() {
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // const { data, loading, error } = useApi();

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p className="text-red-500">Error: {error}</p>;

    // const cars = data.items.filter((item) => item.contentType === "car");

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="w-full mx-auto px-4">
                <div className="flex items-center h-16 justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <div className="text-xl font-bold">Logo</div>
                    </Link>

                    {/* Hamburger Menu Button (for mobile) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none w-full">
                            {menuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
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
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <ul
                        className={`md:flex ${
                            menuOpen ? "block" : "hidden"
                        } flex-col items-center space-y-2 mt-2 text-center text-black bg-white md:flex-row md:space-y-0 md:space-x-4 md:text-white md:bg-transparent`}>
                        <li>
                            <Link
                                href="/"
                                className={`Link ${
                                    pathname === "/" ? "active" : ""
                                }`}>
                                Hem
                            </Link>
                        </li>
                        <div
                            className="relative"
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}>
                            <li>
                                <Link
                                    href="/carscollection"
                                    className={`Link ${
                                        pathname === "/carscollection"
                                            ? "active"
                                            : ""
                                    }`}>
                                    Menu
                                </Link>
                            </li>
                            {/* Dropdown */}
                            {dropdownOpen && (
                                <ul
                                    className="absolute bg-white text-black top-full left-0 w-40 shadow-md z-10 rounded-lg sm:block hidden"
                                    role="menu">
                                    {/* {cars.map((car) => (
                                        <li
                                            key={car.id}
                                            className="p-2 hover:bg-gray-200 rounded-lg"
                                        >
                                            <Link href={car.route.path}>
                                                <p>
                                                    {car.properties.brand}{" "}
                                                    {car.properties.model}
                                                </p>
                                            </Link>
                                        </li>
                                    ))} */}
                                </ul>
                            )}
                        </div>
                        <li>
                            <Link
                                href="/contact"
                                className={`Link ${
                                    pathname === "/contact" ? "active" : ""
                                }`}>
                                Kontakt
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
