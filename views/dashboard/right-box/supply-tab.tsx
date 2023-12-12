import useCollateralActions from "@/application/collateral/actions";
import useUserActions from "@/application/user/actions";
import { DescentButton, DescentInput } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { formatAmount } from "@/utils";
import { useState } from "react";

const SupplyTab = () => {
  const { collateralState, userState } = useSystemFunctions();
  const { depositCollateral } = useCollateralActions();
  const { getVaultInfo } = useUserActions();
  const [amount, setAmount] = useState("");
  const [generated, setGenerated] = useState("");

  const { loadingSupply, collateral } = collateralState;
  const { collateralPrice, liquidationThreshold } = collateral;
  const { user } = userState;

  const valid = amount.length > 0;
  const usdcBalance = formatAmount(user.usdcWalletBalance);

  const handleChange = (val: string) => {
    setAmount(val);
    const _amount = Number(val);
    const lt = Number(liquidationThreshold.replace("%", ""));
    const _generated = !_amount ? "" : (_amount * Number(collateralPrice)) / lt;

    setGenerated(_generated.toString());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    depositCollateral(amount, {
      onSuccess: () => getVaultInfo(),
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">
          Supply collateral
        </div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Fund your vault with USDC
        </div>
      </div>

      <DescentInput
        name="amount"
        valueAlt={"0.00 USD"}
        label="USDC to Supply"
        labelAlt={`${usdcBalance} USDC available`}
        placeholder="0.00"
        valid={valid}
        max={() => setAmount(user.usdcWalletBalance)}
        onChange={(val) => handleChange(val)}
        value={amount}
      />

      <DescentInput
        name="generated"
        valueAlt={"0.00 USD"}
        label="Generated xNGN"
        placeholder="0.00"
        disabled
        value={generated}
      />

      <div className="mt-2">
        <DescentButton
          loading={loadingSupply}
          disabled={!valid || loadingSupply}
          type="submit"
          text="Continue"
        />
      </div>
    </form>
  );
};

export default SupplyTab;
