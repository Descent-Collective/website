"use client";
import { DescentContainer } from "@/components";
import { InfoIcon } from "@/public/icons";
import classNames from "classnames";
import FirstItem from "./first-item";
import SecondItem from "./second-item";
import ThirdItem from "./third-item";
import RightBox from "./right-box";

const DashboardView = () => {
  const firstItems = [
    {
      title: "Total Amount Minted",
      value: "0.00 xNGN",
    },
    {
      title: "Debt Limit",
      value: "12B xNGN",
    },
    {
      title: "Maximum Collateral Ratio",
      value: "80%",
    },
    {
      title: "Borrow Interest",
      value: "5%",
    },
  ];

  const secondItems = [
    {
      title: "Accrued Interest/Fees",
      value: "0.00 xNGN",
    },
    {
      title: "Available Collateral",
      value: "0.00 USDC",
    },
    {
      title: "Collateral Ratio",
      value: "0.00%",
    },
    {
      title: "Collateral Locked",
      value: "$0.00",
    },
  ];

  const thirdItems = [
    {
      title: "Vault xNGN Debt",
      value: "0.00 xNGN",
    },
    {
      title: "Available to Withdraw",
      value: "0.00 USDC",
      buttonText: "Withdraw",
    },
    {
      title: "Available to Borrow",
      value: "12,000.00 xNGN",
      buttonText: "Repay",
    },
  ];
  return (
    <DescentContainer>
      <div className="mt-10 md:mt-16 flex flex-col lg:flex-row lg:justify-between gap-12 xl:gap-16">
        <div className="lg:w-[67%] xl:w-[65%]">
          <div className="py-4 md:py-6 grid grid-cols-2 gap-[22px] xl:gap-0 xl:flex xl:items-center xl:justify-between rounded-xl bg-grey-750 xl:pr-6">
            {firstItems.map((item, index) => (
              <FirstItem
                key={index}
                item={item}
                index={index}
                items={firstItems}
              />
            ))}
          </div>

          <div className="mt-3 lg:mt-5 rounded-xl bg-grey-750 px-3 py-4 md:p-6">
            <div className="flex justify-between items-center lg:mt-5">
              <div className="text-[11px] md:text-base font-medium text-grey-500">
                Overview
              </div>
              <div className="flex items-center gap-1">
                <div className="w-[7px] h-[7px] rounded-full bg-green-50" />
                <div className="text-[9px] md:text-sm font-medium text-grey-500">
                  Healthy
                </div>
                <div className="cursor-pointer">
                  <InfoIcon />
                </div>
              </div>
            </div>

            <div className="my-5 md:my-9 py-6 grid grid-cols-2 gap-[22px] xl:gap-0 xl:flex xl:items-center xl:justify-between border-y border-grey-700">
              {secondItems.map((item, index) => (
                <SecondItem key={index} item={item} />
              ))}
            </div>

            <div className="bg-white-50 rounded-lg py-6 flex justify-between xl:justify-start">
              {thirdItems.map((item, index) => (
                <ThirdItem
                  key={index}
                  item={item}
                  items={thirdItems}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
        <RightBox />
      </div>
    </DescentContainer>
  );
};

export default DashboardView;