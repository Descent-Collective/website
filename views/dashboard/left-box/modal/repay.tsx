import { useState } from "react";
import { DescentButton, DescentInput } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { formatAmount, roundupNumber } from "@/utils";
import useCollateralActions from "@/application/collateral/actions";
import useUserActions from "@/application/user/actions";
import useAlertActions from "@/application/alert/actions";

const RepayModal = ({ close }: { close: () => void }) => {
  const { userState, collateralState } = useSystemFunctions();
  const { repayXNGN } = useCollateralActions();
  const { getVaultInfo } = useUserActions();
  const { alertUser } = useAlertActions();

  const { user } = userState;
  const { loadingRepay, loadingApproveRepay } = collateralState;
  const [amount, setAmount] = useState("");

  const loading = loadingRepay || loadingApproveRepay;
  const valid = amount.length > 0;

  const debt = formatAmount(user?.borrowedAmount);

  const handleChange = (val: string) => {
    if (!val) {
      setAmount("");
      return;
    }

    setAmount(Number(val).toLocaleString());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const amountWithoutComma = amount.replace(/,/g, "");

    if (Number(amountWithoutComma) > Number(user?.borrowedAmount)) {
      return alertUser({
        title: "Cannot repay more than your debt",
        variant: "error",
        message: "You cannot repay more than your debt",
      });
    }

    repayXNGN(amountWithoutComma, {
      onSuccess: () => {
        setAmount("");

        setTimeout(() => {
          getVaultInfo();
        }, 4000);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">
          Repay xNGN
        </div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Payback the xNGN you owe
        </div>
      </div>

      <div>
        <DescentInput
          name="amount"
          valueAlt={"0.00 USD"}
          label="xNGN to Repay"
          labelAlt={`${debt} xNGN debt`}
          placeholder="0.00"
          valid={valid}
          max={() => handleChange(user?.borrowedAmount)}
          onChange={handleChange}
          value={amount}
        />
      </div>

      <div className="mt-2">
        <div>
          <DescentButton
            loading={loading}
            disabled={!valid || loading}
            type="submit"
            text="Continue"
          />
        </div>

        <div className="mt-4">
          <DescentButton onClick={close} variant="info" text="Cancel" />
        </div>
      </div>
    </form>
  );
};

export default RepayModal;