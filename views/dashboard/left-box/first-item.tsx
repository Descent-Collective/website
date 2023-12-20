import { DescentHint } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";

import { formatAmount, formatLargeNumber, roundupNumber } from "@/utils";
import classNames from "classnames";
import { memo } from "react";

const FirstItem = () => {
  const { collateralState } = useSystemFunctions();

  const { collateral } = collateralState;

  const items = [
    {
      title: "Total Amount Minted",
      value: `${formatAmount(
        roundupNumber(collateral?.totalBorrowedAmount)
      )} xNGN`,
      hint: "This is the maximum amount of xNGN that can be minted/borrowed. The value is being set by the protocol.",
    },
    {
      title: "Debt Limit",
      value: `${formatLargeNumber(collateral.debtCeiling)} xNGN`,
      hint: "This is the cost you pay for the xNGN loan taken. Basically, you’ll repay the borrowed xNGN together with the interest amount.",
    },
    {
      title: "Maximum Collateral Ratio",
      value: `${collateral.liquidationThreshold}`,
      hint: "It represents the minimum percentage of collateral that a borrower must maintain in relation to the value of the assets they have borrowed. E.g. If the minimum collateral ratio is 80% it means you can only borrow 80% worth of your collateral. It is advisable to keep you collateral ratio below the minimum collateral ratio.",
    },
    {
      title: "Borrow Interest",
      value: `${Number(roundupNumber(collateral.rate)) + Number(1)}%`,
      hint: "This is the cost you pay for the xNGN loan taken. Basically, you’ll repay the borrowed xNGN together with the interest amount.",
    },
  ];

  return (
    <div className="py-4 md:py-6 grid grid-cols-2 gap-[22px] xl:gap-0 xl:flex xl:items-center xl:justify-between rounded-xl bg-grey-750 xl:pr-6">
      {items.map((item, index) => (
        <div
          key={index}
          className={classNames("", {
            "pl-3 md:pl-6 pr-10": index === 0,
            "px-3 md:px-10": index > 0,
            "xl:border-r xl:border-grey-700": index < items.length - 1,
          })}
        >
          <div className="flex items-center xl:justify-center gap-1">
            <div className="text-[9px] md:text-sm font-medium text-grey-500 whitespace-nowrap">
              {item.title}
            </div>
            <DescentHint text={item?.hint} />
          </div>
          <div className="mt-2 text-[9.5px] md:text-base font-medium md:font-bold">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(FirstItem);
