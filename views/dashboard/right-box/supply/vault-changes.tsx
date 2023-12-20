import useSystemFunctions from "@/hooks/useSystemFunctions";
import { InfoIcon } from "@/public/icons";
import { formatAmount } from "@/utils";

const VaultChanges = ({ amount }: { amount: number }) => {
  const { collateralState, userState } = useSystemFunctions();
  const { user } = userState;
  const { collateral } = collateralState;

  const vaultChanges = [
    {
      title: "Collateral Locked",
      value: `${formatAmount(user.collateralLocked)} USDC`,
    },
    {
      title: "Collateral Ratio",
      value: `${user.currentCollateralRatio}%`,
    },
    {
      title: "Liquidation Price",
      value: `₦0.00/USDC`,
    },
    {
      title: "Vault xNGN Debt",
      value: `0.00 xNGN`,
    },
    {
      title: "Available Collateral",
      value: `$0.00`,
    },
    {
      title: "Available to Borrow",
      value: `0.00 xNGN`,
    },
  ];

  if (amount > 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-[13px]">
          <h3 className="font-semibold text-[10px] md:text-xs text-black-50">
            Vault Changes
          </h3>
          <InfoIcon />
        </div>

        <div className="gap-[18px] grid grid-cols-1">
          {vaultChanges.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between text-[10px] md:text-xs font-medium"
            >
              <div className="text-grey-500">{item.title}</div>
              <div className="text-black-50 max-w-[50%] text-right">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default VaultChanges;
