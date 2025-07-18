"use client";

import Image from 'next/image';
import React from 'react'

function Footer() {
    return (
        <footer className="flex justify-center pb-15 md:pb-8 py-4">
            <p className="footer-text text-sm flex items-center gap-1">
                Made by
                <Image src={'./logo-white.svg'} alt="logo" width={20} height={20} unoptimized />
                <a href="https://portfolio-rho-green-23.vercel.app/" target="_blank" className="text-purple-600 font-bold">Arnab Dey</a>
            </p>
        </footer>
    )
}

export default Footer
