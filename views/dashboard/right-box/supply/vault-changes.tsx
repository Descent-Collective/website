import { DescentHint } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { InfoIcon } from "@/public/icons";
import { formatAmount } from "@/utils";

const VaultChanges = ({ amount, generated }: { amount: number, generated: number }) => {
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
       // borrowed amount / deposited collateral * collateral price
      value: `${((Number(user.borrowedAmount) + Number(user.accruedFees)) / ((Number(user.availableCollateral) + Number(amount)) * Number(collateral.collateralPrice)) * 100).toFixed(2)}%`,
    },
    {
      title: "Liquidation Price",
      value: `₦0.00/USDC`,
    },
    {
      title: "Vault xNGN Debt",
      value: `${formatAmount(user.borrowedAmount)} xNGN`,
    },
    {
      title: "Available Collateral",
      value: `${formatAmount(Number(user.availableCollateral) + Number(amount))} USDC`,
    },
    {
      title: "Available to Borrow",
      value: `${formatAmount(Number(user.availablexNGN) + generated)} xNGN`,
    },
  ];

  if (amount > 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-[13px]">
          <h3 className="font-semibold text-[10px] md:text-xs text-black-50">
            Vault Changes
          </h3>
          <DescentHint text={'New vault changes based on deposited amount'} />
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
