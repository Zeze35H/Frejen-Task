"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
            <div>
                <Link href="/homepage" className="text-lg font-semibold hover:text-gray-300">
                    Homepage
                </Link>
            </div>

            <div className="flex gap-4">
                <Link
                    href="/profile"
                    className="text-lg font-semibold hover:text-gray-300"
                >
                    Profile
                </Link>
                <button
                    onClick={() => {
                        console.log("Logout clicked");
                    }}
                    className="text-lg font-semibold hover:text-gray-300"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
