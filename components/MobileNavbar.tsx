"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="Hambueger"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-dark-1 border-none">
          <Link href="/" className=" flex gap-1 items-center ">
            <Image
              src="/icons/logo.svg"
              alt="Yoom"
              className="max-sm:size-10"
              width={32}
              height={32}
            />
            <p className="font-extrabold text-white text-[26px] ">Yoom</p>
          </Link>
          
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
            {sidebarLinks.map((link) => {
              const isActive =
                pathname === link.route ;
              return (
                <SheetClose asChild key={link.label}>
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
                  <p className="text-lg font-semibold ">{link.label}</p>
                </Link>
                </SheetClose>
              );
            })}
            </section>
          </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
