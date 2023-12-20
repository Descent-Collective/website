import { InfoIcon } from "@/public/icons";
import FirstItem from "./first-item";
import SecondItem from "./second-item";
import ThirdItem from "./third-item";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { formatLargeNumber, roundupNumber, formatAmount } from "@/utils";

const LeftBox = () => {
  const { userState, collateralState } = useSystemFunctions();

  const { user } = userState;
  const { collateral } = collateralState;

  const firstItems = [
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

  const secondItems = [
    {
      title: "Accrued Interest/Fees",
      value: `${formatAmount(roundupNumber(user?.accruedFees))} xNGN`,
    },
    {
      title: "Deposited Collateral",
      value: `${formatAmount(roundupNumber(user?.depositedCollateral))} USDC`,
    },
    {
      title: "Collateral Ratio",
      value: `${roundupNumber(user?.currentCollateralRatio)}%`,
    },
    {
      title: "Collateral Locked",
      value: `${formatAmount(roundupNumber(user?.collateralLocked))} USDC`,
    },
  ];

  const thirdItems = [
    {
      title: "Available to Borrow",
      value: `${formatAmount(roundupNumber(user?.availablexNGN))} xNGN`,
    },

    {
      title: "Available Collateral",
      value: `${formatAmount(roundupNumber(user?.availableCollateral))} USDC`,
      buttonText: "Withdraw",
      disabled: Number(user?.availableCollateral) === 0,
    },

    {
      title: "Vault xNGN Debt",
      value: `${formatAmount(roundupNumber(user?.borrowedAmount))} xNGN`,
      buttonText: "Repay",
      disabled: Number(user?.borrowedAmount) === 0,
    },
  ];
  return (
    <div className="xl:w-[65%] relative z-10">
      <div className="py-4 md:py-6 grid grid-cols-2 gap-[22px] xl:gap-0 xl:flex xl:items-center xl:justify-between rounded-xl bg-grey-750 xl:pr-6">
        {firstItems.map((item, index) => (
          <FirstItem key={index} item={item} index={index} items={firstItems} />
        ))}
      </div>

      <div className="mt-3 xl:mt-5 rounded-xl bg-grey-750 px-3 py-4 md:p-6">
        <div className="flex justify-between items-center xl:mt-5">
          <div className="text-[11px] md:text-base font-medium text-grey-500">
            Overview
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`w-[7px] h-[7px] rounded-full ${
                user?.healthFactor === "Safe" ? "bg-green-50" : "bg-red-50"
              } `}
            />
            <div className="text-[9px] md:text-sm font-medium text-grey-500">
              {user?.healthFactor === "Safe" ? "Healthy" : "Unsafe"}
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
  );
};

export default LeftBox;
