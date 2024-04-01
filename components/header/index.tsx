"use client";
import { useState } from "react";

import { LogoIcon, MenuIcon } from "@/public/icons";
import { DescentClickAnimation, DescentContainer } from "..";
import MenuComponent from "./menu";
import Link from "next/link";

const menuItems = [
  {
    title: "Frames explorer",
    link: "#",
  },
  {
    title: "Farcaster",
    link: "#",
  },
  {
    title: "Resources",
    link: "#",
    items: [1],
  },
  {
    title: "Twitter",
    link: "#",
  },
];

const DescentHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DescentContainer>
        <header className="flex items-center justify-between pt-10">
          <LogoIcon />

          <div className="hidden lg:flex gap-8">
            {menuItems.map((item, index) => (
              <DescentClickAnimation key={index}>
                <Link
                  href={item.link}
                  className="no-underline flex items-center gap-1"
                >
                  <div className="text-base font-medium text-grey-1000">
                    {item.title}
                  </div>
                </Link>
              </DescentClickAnimation>
            ))}
          </div>

          <div className="lg:hidden">
            <DescentClickAnimation>
              <div onClick={() => setIsOpen(true)}>
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
