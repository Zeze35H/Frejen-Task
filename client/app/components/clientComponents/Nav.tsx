"use client";

import React from "react";
import Link from "next/link";
import { logout } from '../../utils/api'
import { useRouter } from 'next/navigation'


const Navbar = () => {

    const router = useRouter()

    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response)
            if (response.data) {
                console.log(response.data.message)
                router.replace("/login")
            }
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
            <div className="flex gap-4">
                <Link href="/homepage" className="text-lg font-semibold hover:text-gray-300">
                    Homepage
                </Link>
                <Link href="/ticket_create" className="text-lg font-semibold hover:text-gray-300">
                    Create Ticket
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
                    onClick={handleLogout}
                    className="text-lg font-semibold hover:text-gray-300"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
