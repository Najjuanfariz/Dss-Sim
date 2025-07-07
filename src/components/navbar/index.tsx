"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    if (pathname === "/login") return null; 
    return (
    <nav className="bg-primary shadow-lg">
    <div className="container mx-auto py-3">
        <div className="flex justify-between item-center">
          {/* Logo */}
            <Link href="/">
                <Image src="LogoNavbar.svg" 
                alt="Logo" 
                width={170} 
                height={55} 
                className="items-center"/>
            </Link>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;