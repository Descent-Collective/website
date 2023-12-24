"use client";

import { MenuIcon } from "@/public/icons";
import { DescentButton, DescentClickAnimation } from "..";
import useDescent from "@/hooks/useDescent";

const Button = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  const {} = useDescent();

  return (
    <div className="relative z-10">
      <div className="max-lg:hidden">
        <a
          href="https://app.descentdao.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          
          <div className="min-w-[100px] md:min-w-[160px] ">
            <DescentButton variant="info" text="Enter App" />
          </div>
        </a>

        <div className="flex items-center justify-end gap-2">
       
        </div>
      </div>
         <DescentClickAnimation>
            <div onClick={() => setOpen(true)} className="md:hidden">
              <MenuIcon />
            </div>
          </DescentClickAnimation>
    </div>
  );
};

export default Button;
