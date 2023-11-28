import { useState } from "react";
import Link from "next/link";

import { BaseIcon, LogoIcon, MenuIcon, MetamaskIcon } from "@/public/icons";
import { DescentClickAnimation, DescentContainer } from "..";
import MenuComponent from "./menu";

const DescentHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DescentContainer>
        <header className="flex items-center justify-between pt-5">
          <div className="flex items-center gap-6">
            <Link href="/">
              <LogoIcon />
            </Link>
            <div className="items-center gap-6 hidden md:flex">
              <div className="w-[1px] h-[39px] bg-grey-100" />
              <Link className="text-base xl:text-lg font-medium" href="#">
                Docs
              </Link>
              <Link className="ml-6 text-base xl:text-lg font-medium" href="#">
                Community
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="hidden md:flex">
              <DescentClickAnimation>
                <div className="bg-white-50 cursor-pointer border border-white-100 rounded-md h-10 lg:h-12 p-3 flex justify-center items-center gap-[6px]">
                  <BaseIcon />
                  <div className="lg:text-lg text-xs font-medium text-black-100">
                    0 ETH
                  </div>
                </div>
              </DescentClickAnimation>
            </div>

            <DescentClickAnimation>
              <div className="bg-white-150 cursor-pointer border border-white-100 rounded-2xl md:rounded-md h-8 md:h-12 px-[6px] py-[7px] md:p-3 flex justify-center items-center gap-2">
                <MetamaskIcon />
                <div className="md:text-lg text-[10px] font-medium text-black-100">
                  0xE3...4f2E
                </div>
              </div>
            </DescentClickAnimation>

            <DescentClickAnimation>
              <div onClick={() => setIsOpen(true)} className="md:hidden">
                <MenuIcon />
              </div>
            </DescentClickAnimation>
          </div>
        </header>
      </DescentContainer>

      <MenuComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DescentHeader;
