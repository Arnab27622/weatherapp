/**
 * Footer Component
 * A simple, consistent footer displaying branding and developer credit.
 */

"use client";

import Image from 'next/image';

/**
 * Footer component
 * @returns Responsive footer containing developer info and logo
 */
function Footer() {
    return (
        <footer className="flex justify-center pb-15 md:pb-8 py-4">
            <p className="footer-text text-sm flex items-center gap-1">
                Made by
                <Image src="/logo-white.svg" alt="logo" width={20} height={20} unoptimized />
                <span className="text-purple-600 font-bold">Arnab Dey</span>
            </p>
        </footer>
    )
}

export default Footer
