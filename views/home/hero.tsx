import Link from "next/link";
import {
  DescentButton,
  DescentClickAnimation,
  DescentContainer,
} from "@/components";
import {
  ArrowRightAlt,
  ArrowRightIcon,
  BaseIcon,
  FirstShape,
  SecondShape,
  ThirdShape,
} from "@/public/icons";
import classNames from "classnames";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { formatAmount } from "@/utils";

const HeroSection = () => {
  const { navigate, collateralState } = useSystemFunctions();
  const { collateral } = collateralState;

  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();

  const [startedConnecting, setStartedConnecting] = useState(false);
  const content = [
    {
      title: `${formatAmount(collateral.totalBorrowedAmount)} xNGN`,
      description: "xNGN generated",
    },
    {
      title: `${formatAmount(collateral.collateralPrice)} xNGN`,
      description: "xNGN/USDC price",
    },
    {
      title: `${formatAmount(collateral.totalBorrowedAmount)} xNGN`,
      description: "xNGN volume",
    },
  ];

  const handleEnterApp = () => {
    if (isConnected && address) {
      return navigate.push("/app");
    }

    if (!openConnectModal) return;

    setStartedConnecting(true);
    openConnectModal();
  };

  useEffect(() => {
    if (startedConnecting && isConnected && address) {
      navigate.push("/app");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedConnecting, openConnectModal, isConnected, address]);
  return (
    <section className="relative mt-32 xl:mt-24">
      <DescentContainer>
        <div className="w-full flex flex-col justify-center items-center">
          <Link
            href="#"
            className="rounded-3xl group py-2 px-4 flex items-center gap-4 bg-white-50 shadow-alt cursor-pointer"
          >
            <BaseIcon />
            <div className="text-[10px] md:text-sm text-black-50">
              Descent protocol is built on Base
            </div>
            <div className="w-[1px] h-4 bg-grey-150" />
            <div className="flex items-center gap-2 group-hover:scale-105 transition-all duration-200">
              <div className="text-[10px] md:text-sm text-black-50 group-hover:text-blue-150">
                Read more
              </div>
              <ArrowRightIcon />
            </div>
          </Link>

          <h1 className="font-Space_Mono text-center font-normal leading-[40px] md:leading-[50px] lg:leading-[80px] text-[26px] md:text-5xl lg:text-[54px] text-black-50 mt-6 md:mt-10 w-full md:w-[95%] xl:w-[65%]">
            Decentralized <span className="text-green-150">protocol</span>{" "}
            powering digital currencies
          </h1>

          <h3 className="md:w-[55%] xl:w-[40%] xl:px-5 text-sm md:text-xl xl:text-xl leading-[27px] md:leading-[32px] text-center text-grey-200 mt-3 md:mt-6 font-normal">
            Over-collateralized and capital efficient protocol powering xNGN,
            the most liquid Naira stablecoin
          </h3>

          <div className="mt-12 flex items-center justify-center gap-8">
            <a
              href="https://interface-opal-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <div className="w-[150px]">
                <DescentButton text="Enter App" />
              </div>
            </a>

            <DescentClickAnimation>
              <Link href="https://docs.descentdao.com/" className="flex">
                <div className="text-grey-250 text-lg">Read docs</div>
                <ArrowRightAlt />
              </Link>
            </DescentClickAnimation>
          </div>

          <div className="mt-10 md:mt-20 bg-black-200 rounded-3xl w-full py-8 flex flex-row justify-around md:justify-center items-center lg:gap-0">
            {content.map((item, index) => (
              <div
                className={classNames(
                  "flex flex-col justify-center items-center gap-4 md:w-1/4",
                  {
                    "md:border-x md:border-grey-300": index === 1,
                  }
                )}
                key={index}
              >
                <div className="font-Space_Mono text-lg md:text-2xl lg:text-[32px] text-white-50 text-center">
                  {item.title}
                </div>
                <div className="text-[10px] md:text-sm lg:text-base text-white-50 text-center">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DescentContainer>

      <div className="absolute -bottom-20 md:bottom-0 xl:-bottom-20 right-0">
        <FirstShape />
      </div>

      <div className="absolute hidden md:flex -bottom-20 md:bottom-0 xl:-bottom-20 left-0">
        <SecondShape />
      </div>

      <div className="absolute top-0 right-0">
        <ThirdShape />
      </div>
    </section>
  );
};

export default HeroSection;
