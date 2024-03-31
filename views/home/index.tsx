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

      <div className="hidden xl:flex absolute top-24 right-0 z-50">
        <Image alt="frame" src="/frame1.svg" width={190} height={200} />
      </div>

      <div className="gradient-background z-[99999] w-full absolute bottom-0 left-0 right-0 h-1/3" />

      <div className="hidden xl:flex absolute top-24 left-0 z-50">
        <Image alt="frame" src="/frame2.svg" width={190} height={200} />
      </div>

      <div className="hidden xl:flex absolute top-[510px] right-0 z-40">
        <Image alt="frame" src="/frame3.svg" width={190} height={200} />
      </div>

      <div className="hidden xl:flex absolute top-[570px] left-0 z-40">
        <Image alt="frame" src="/frame4.svg" width={170} height={100} />
      </div>

      <div className="hidden xl:flex absolute -bottom-9 left-0 z-40">
        <Image alt="frame" src="/frame5.svg" width={190} height={200} />
      </div>

      <div className="hidden xl:flex absolute -bottom-16 right-0 z-30">
        <Image alt="frame" src="/frame6.svg" width={330} height={200} />
      </div>

      <div className="hidden xl:flex absolute -bottom-5 left-[140px] z-40">
        <Image alt="frame" src="/frame7.svg" width={285} height={200} />
      </div>

      <div className="hidden xl:flex absolute -bottom-11 right-[270px] z-20">
        <Image alt="frame" src="/frame8.svg" width={295} height={200} />
      </div>

      <div className="hidden xl:flex absolute -bottom-12 right-[500px] z-50">
        <Image alt="frame" src="/frame9.svg" width={340} height={200} />
      </div>

      <div className="hidden xl:flex absolute -bottom-20 left-[330px] z-40">
        <Image alt="frame" src="/frame10.svg" width={500} height={200} />
      </div>
    </div>
  );
};

export default HomeView;
