import { BaseIcon, LogoIcon, LogoSmIcon, MetamaskIcon } from "@/public/icons";
import Link from "next/link";
import { DescentClickAnimation } from "..";

const DescentHeader = () => {
  return (
    <header className="flex items-center justify-between pt-5">
      <div className="flex items-center gap-6">
        <Link className="hidden md:block" href="/">
          <LogoIcon />
        </Link>
        <Link className="md:hidden" href="/">
          <LogoSmIcon />
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
        <DescentClickAnimation>
          <div className="bg-white-50 cursor-pointer border border-white-100 rounded-md h-10 lg:h-12 p-3 flex justify-center items-center gap-[6px]">
            <BaseIcon />
            <div className="lg:text-lg text-xs font-medium text-black-100">
              0 ETH
            </div>
          </div>
        </DescentClickAnimation>

        <DescentClickAnimation>
          <div className="bg-white-150 cursor-pointer border border-white-100 rounded-md h-10 lg:h-12 p-3 flex justify-center items-center gap-2">
            <MetamaskIcon />
            <div className="lg:text-lg text-xs font-medium text-black-100">
              0xE3...4f2E
            </div>
          </div>
        </DescentClickAnimation>
      </div>
    </header>
  );
};

export default DescentHeader;
