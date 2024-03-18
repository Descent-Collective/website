import {
  DescentClickAnimation,
  DescentContainer,
  DescentHeader,
} from "@/components";
import { LogoIcon } from "@/public/icons";
import Image from "next/image";
import Link from "next/link";

const HomeView = () => {
  return (
    <div id="vertical" className="relative min-h-screen bg-white-50">
      <div
        id="horizontal"
        className="absolute top-0 left-0 bottom-0 right-0 h-full"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 h-full white-bg z-10" />

      <div className="relative z-20">
        <DescentHeader />

        <div className="mt-[40%] md:mt-[10%] flex flex-col items-center justify-center gap-5">
          <div className="border border-grey-1050 rounded-full h-[30px] px-3 flex items-center bg-white-50">
            <div className="font-medium text-sm md:text-base text-grey-1000">
              Descent Protocol
            </div>
          </div>

          <div className="md:w-[80%] xl:w-[60%] flex justify-center">
            <h1 className="text-4xl md:text-6xl xl:text-[64px] md:leading-[64px] font-semibold text-grey-1100 text-center">
              A micropayment stablecoin for the onchain economy
            </h1>
          </div>

          <div className="text-center md:text-xl text-grey-1200">
            Powering finance in the Farcaster-driven ecosystem
          </div>

          <DescentClickAnimation>
            <Link
              href="#"
              className="rounded-full h-[40px] px-4 flex items-center bg-green-650"
            >
              <div className="font-medium text-base md:text-lg text-white-50">
                Explore frames
              </div>
            </Link>
          </DescentClickAnimation>
        </div>
      </div>

      <div className="hidden lg:flex absolute top-28 right-0 z-30">
        <Image alt="frame" src="/frame1.svg" width={190} height={200} />
      </div>

      <div className="hidden lg:flex absolute top-28 left-0 z-30">
        <Image alt="frame" src="/frame2.svg" width={190} height={200} />
      </div>

      <div className="hidden lg:flex absolute top-[530px] right-0 z-20">
        <Image alt="frame" src="/frame3.svg" width={190} height={200} />
      </div>

      <div className="hidden lg:flex absolute top-[590px] left-0 z-20">
        <Image alt="frame" src="/frame4.svg" width={190} height={200} />
      </div>
    </div>
  );
};

export default HomeView;
