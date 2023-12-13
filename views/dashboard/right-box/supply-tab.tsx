import useAlertActions from "@/application/alert/actions";
import useCollateralActions from "@/application/collateral/actions";
import useUserActions from "@/application/user/actions";
import { DescentButton, DescentInput } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { formatAmount } from "@/utils";
import { useState } from "react";

const SupplyTab = () => {
  const { collateralState, userState } = useSystemFunctions();
  const { alertUser } = useAlertActions();
  const { depositCollateral } = useCollateralActions();
  const { getVaultInfo } = useUserActions();
  const [amount, setAmount] = useState("");
  const [generated, setGenerated] = useState("");

  const { loadingSupply, loadingApproveSupply, collateral } = collateralState;
  const { collateralPrice, liquidationThreshold } = collateral;
  const { user } = userState;

  const loading = loadingApproveSupply || loadingSupply;
  const valid = amount.length > 0;
  const usdcBalance = formatAmount(user.usdcWalletBalance);

  const handleChange = (val: string) => {
    if (!val) {
      setAmount("");
      setGenerated("");
      return;
    }

    setAmount(Number(val).toLocaleString());
    const _amount = Number(val);
    const lt = Number(liquidationThreshold.replace("%", ""));
    const _generated = !_amount ? "" : (_amount * Number(collateralPrice)) * (lt/ 100);

    setGenerated(_generated.toString());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const amountWithoutComma = amount.replace(/,/g, "");

    if (Number(amountWithoutComma) > Number(user.usdcWalletBalance)) {
      return alertUser({
        title: "Insufficient USDC balance.",
        variant: "error",
        message: "You do not have enough USDC in your wallet",
      });
    }

    depositCollateral(amountWithoutComma, {
      onSuccess: () => {
        setAmount("");
        setGenerated("");

        setTimeout(() => {
          getVaultInfo();
        }, 3000);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">
          Deposit collateral
        </div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Fund your vault with USDC
        </div>
      </div>

      <DescentInput
        name="amount"
        label="USDC to Deposit"
        labelAlt={`Balance: ${usdcBalance}`}
        placeholder="0.00"
        valid={valid}
        max={() => setAmount(user.usdcWalletBalance)}
        onChange={handleChange}
        value={amount}
      />

      <DescentInput
        name="generated"
        label="Generated xNGN"
        placeholder="0.00"
        disabled
        value={generated}
      />

      <div className="mt-2">
        <DescentButton
          loading={loading}
          disabled={!valid || loading}
          type="submit"
          text="Continue"
        />
      </div>
    </form>
  );
};

export default SupplyTab;
