import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";
import { SignedIn, UserButton } from '@clerk/nextjs';


const Navbar = () => {
  return (
    <nav className="w-full flex flex-between items-center fixed  z-50 bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className=" flex gap-1 items-center ">
        <Image
          src="/icons/logo.svg"
          alt="Yoom"
          className="max-sm:size-10"
          width={32}
          height={32}
        />
        <p className="font-extrabold text-white text-[26px] max-sm:hidden">
          Yoom
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton/>
        </SignedIn>

        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
