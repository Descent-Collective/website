"use client";
import { useState } from "react";
import Link from "next/link";

import { LogoIcon } from "@/public/icons";
import { DescentAlert, DescentContainer } from "..";
import MenuComponent from "./menu";
import Button from "./button";

const DescentHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DescentContainer>
        <header className="bg-white-50">
          <nav className="flex items-center justify-between pt-5">
            <div className="flex items-center gap-6 relative z-10">
              <Link href="/">
                <LogoIcon />
              </Link>
              <div className="items-center gap-6 hidden md:flex">
                <div className="w-[1px] h-[39px] bg-grey-100" />
                <Link
                  className="text-base xl:text-lg font-medium"
                  href="https://docs.descentdao.com"
                >
                  Docs
                </Link>
              </div>
            </div>

            <Button setOpen={setIsOpen} />
          </nav>
        </header>

        <DescentAlert />
      </DescentContainer>

      <MenuComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DescentHeader;
