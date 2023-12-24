import { DescentButton } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  ArgentinaFlag,
  BaseIcon,
  KenyaFlag,
  NigeriaFlag,
  UsdcFlag,
} from "@/public/icons";
import { formatAmount } from "@/utils";
import React from "react";


const FourthStep = () => {
  
  const { collateralState } = useSystemFunctions();

  const { collateral } = collateralState;

  const content = [
  {
    title: "USDC - xNGN",
    volume:  `${formatAmount(collateral.totalBorrowedAmount)} xNGN`,
    tvl:  `${formatAmount(collateral.totalDepositedCollateral)} USDC`,
    borrowRate: `${Number(collateral.rate).toPrecision(2)}%`,
    icon: <NigeriaFlag />,
  },
  {
    title: "USDC - xARS",
    volume: "-",
    tvl: "-",
    borrowRate: "0%",
    icon: <ArgentinaFlag />,
    isComingSoon: true,
  },
  {
    title: "USDC - xKES",
    volume: "-",
    tvl: "-",
    borrowRate: "0%",
    icon: <KenyaFlag />,
    isComingSoon: true,
  },
];

  
  return (
    <section className="bg-green-200 py-10 px-8 pb-14 md:p-12 md:pb-20 xl:pt-[61px] xl:pb-[91px] xl:px-20 2xl:px-44 mt-12 md:mt-[72px]">
      <h4 className="font-Space_Mono text-center text-3xl md:text-[40px]">
        Vaults
      </h4>
      <p className="text-center text-base md:text-xl text-grey-200 mt-6 xl:max-w-[47%] 2xl:max-w-[26%] mx-auto">
        Borrow against your crypto assets at competitive rates to unlock new
        capital streams.
      </p>

      <div className="mt-14 xl:mt-[72px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 2xl:gap-10">
        {content.map((item, index) => (
          <Box key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

interface IBox {
  title: string;
  volume: string;
  tvl: string;
  borrowRate: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
}

const Box = (props: IBox) => {
  const { title, volume, tvl, borrowRate, icon, isComingSoon } = props;
  return (
    <div className="py-8 px-4 rounded-2xl bg-white-50 border border-black-250">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 md:gap-9">
          <div className="relative">
            <div className="z-20 relative ">
              <UsdcFlag />
            </div>
            <div className="absolute top-0 left-5 rounded-full">{icon}</div>
          </div>
          <div className="text-base md:text-xl font-medium">{title}</div>
        </div>
        <div className="rounded-lg py-1 px-2 border border-grey-350 bg-white-50 flex items-center gap-2">
          <BaseIcon />
          <div className="text-sm md:text-base font-medium">Base</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-11 pb-7 border-b border-grey-350">
        <div>
          <div className="text-grey-550 text-sm mb-[6px]">Volume</div>
          <div className="text-grey-600 text-base font-medium">{volume}</div>
        </div>
        <div>
          <div className="text-grey-550 text-sm mb-[6px]">Borrow rate</div>
          <div className="text-green-250 text-2xl font-bold">{borrowRate}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 pb-7">
        <div>
          <div className="text-grey-550 text-sm mb-[6px]">TVL</div>
          <div className="text-grey-600 text-base font-medium">{tvl}</div>
        </div>
      </div>

      <DescentButton disabled={isComingSoon} variant="tertiary" text="Borrow" />
    </div>
  );
};

export default FourthStep;
