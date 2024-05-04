"use client";
import React from "react";

// import {sidebarLinks} from "../constants"
import Link from "next/link";
import "../app/globals.css"

// import {Side}impor
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky left-0 top-0 flex flex-col justify-between h-screen w-fit bg-dark-1 p-6 pt-36 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route ;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center justify-start p-4 rounded-lg text-white",
                { "bg-blue-1": isActive }
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;


// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import "../app/globals.css"

// import { sidebarLinks } from '@/constants';
// import { cn } from '@/lib/utils';

// const Sidebar = () => {
//   const pathname = usePathname();

//   return (
//     <div className='text-lg text-blue-800 font-extrabold text-3xl'>
//       Mee
//     </div>
//   );
// };

// export default Sidebar;
