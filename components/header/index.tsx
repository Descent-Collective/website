"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";

import {
  BaseIcon,
  ClosedEyeIcon,
  FilterIcon,
  LogoIcon,
  MenuIcon,
  MetamaskIcon,
  NigeriaFlag,
  UsdcFlag,
} from "@/public/icons";
import { DescentButton, DescentClickAnimation, DescentContainer } from "..";
import MenuComponent from "./menu";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import classNames from "classnames";
import { formatAddress } from "@/utils";
import Button from "./button";

const DescentHeader = () => {
  const { pathname } = useSystemFunctions();
  const [isOpen, setIsOpen] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const isDashboardRoute: boolean = pathname.includes("/app");

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      <DescentContainer>
        <header
          className={classNames("bg-white-50", {
            "": isDashboardRoute,
          })}
        >
          <nav className="flex items-center justify-between pt-5">
            <div className="flex items-center gap-6">
              <Link href="/">
                <LogoIcon />
              </Link>
              <div className="items-center gap-6 hidden md:flex">
                <div className="w-[1px] h-[39px] bg-grey-100" />
                <Link className="text-base xl:text-lg font-medium" href="#">
                  Docs
                </Link>
                <Link
                  className="ml-6 text-base xl:text-lg font-medium"
                  href="#"
                >
                  Community
                </Link>
              </div>
            </div>

            {domLoaded && <Button setOpen={setIsOpen} />}
          </nav>

          {isDashboardRoute && (
            <div className="mt-10 xl:mt-16 flex items-center justify-between">
              <div>
                <div className="text-sm md:text-base font-medium text-grey-500">
                  Wallet Balance
                </div>
                <div className="mt-1 xl:mt-[5px] flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <UsdcFlag />
                    <h2 className="text-[28px] md:text-[40px] font-medium text-grey-500">
                      <span className="text-black-100">0</span>.0000
                    </h2>
                  </div>

                  <DescentClickAnimation onClick={() => null}>
                    <div className="flex justify-center items-center p-1 lg:p-2 bg-white-150 shadow-box rounded-lg cursor-pointer">
                      <FilterIcon />
                    </div>
                  </DescentClickAnimation>

                  <DescentClickAnimation onClick={() => null}>
                    <div className="flex justify-center items-center p-1 lg:p-2 bg-white-150 shadow-box rounded-lg cursor-pointer">
                      <ClosedEyeIcon />
                    </div>
                  </DescentClickAnimation>
                </div>

                <div className="text-black-100 text-sm xl:text-base mt-1 font-medium">
                  $0.00
                </div>
              </div>
              <div className="flex items-center gap-8 md:gap-9">
                <div className="relative">
                  <div className="z-20 relative ">
                    <UsdcFlag />
                  </div>
                  <div className="absolute top-0 left-5 rounded-full">
                    <NigeriaFlag />
                  </div>
                </div>
                <div className="text-sm md:text-base font-medium hidden md:block">
                  USDC - xNGN Vault
                </div>
              </div>
            </div>
          )}
        </header>
      </DescentContainer>

      <MenuComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DescentHeader;
