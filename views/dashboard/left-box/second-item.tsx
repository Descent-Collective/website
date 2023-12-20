import useSystemFunctions from "@/hooks/useSystemFunctions";
import { InfoIcon } from "@/public/icons";
import { formatAmount, roundupNumber } from "@/utils";

const SecondItem = () => {
  const { userState } = useSystemFunctions();

  const { user } = userState;

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

  return (
    <div className="my-5 md:my-9 py-6 grid grid-cols-2 gap-[22px] xl:gap-0 xl:flex xl:items-center xl:justify-between border-y border-grey-700">
      {secondItems.map((item, index) => (
        <div key={index}>
          <div className="flex items-center xl:justify-center gap-1">
            <div className="text-[9px] md:text-sm font-medium text-grey-500">
              {item.title}
            </div>
            <div className="cursor-pointer">
              <InfoIcon />
            </div>
          </div>
          <div className="mt-2 text-[10px] md:text-base font-medium md:font-bold">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecondItem;
