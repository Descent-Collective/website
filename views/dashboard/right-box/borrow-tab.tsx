import useAlertActions from "@/application/alert/actions";
import useCollateralActions from "@/application/collateral/actions";
import { DescentButton, DescentInput } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { InfoAltIcon } from "@/public/icons";
import { formatAmount } from "@/utils";
import { useState } from "react";

const BorrowTab = () => {
  const { collateralState, userState } = useSystemFunctions();
  const { alertUser } = useAlertActions();
  const { borrowXNGN } = useCollateralActions();

  const [amount, setAmount] = useState("");

  const { loadingBorrow, loadingApproveBorrow } = collateralState;
  const { user } = userState;
  const { availablexNGN } = user;

  const loading = loadingApproveBorrow || loadingBorrow;
  const xNgn = formatAmount(availablexNGN);

  const valid = amount.length > 0;

  const handleChange = (val: string) => {
    if (!val) {
      setAmount("");
      return;
    }

    setAmount(val);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const amountWithoutComma = amount.replace(/,/g, "");

    if (Number(amountWithoutComma) > Number(availablexNGN)) {
      return alertUser({
        title: "Insufficient xNGN available",
        variant: "error",
        message: "You do not have enough xNGN available to borrow",
      });
    }

    borrowXNGN(amountWithoutComma, {
      onSuccess: () => {
        setAmount("");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">
          Borrow xNGN
        </div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Borrow from xNGN in vault
        </div>
      </div>

      <div>
        <DescentInput
          name="amount"
          valueAlt={"0.00 USD"}
          label="xNGN to Borrow"
          labelAlt={`${xNgn} xNGN available`}
          placeholder="0.00"
          valid={valid}
          max={() => handleChange(availablexNGN)}
          onChange={handleChange}
          value={amount}
        />

        <div className="mt-3 rounded-xl py-3 px-2 flex gap-1 bg-red-100 text-red-150">
          <div className="w-[17px]">
            <InfoAltIcon />
          </div>
          <div className="text-[10px] md:text-sm">
            Continuing with this amount may risk vault liquidation. Consider a
            lower value that takes you farther away from the minimum
            <span className="font-semibold"> Collateral Ratio</span>.
          </div>
        </div>
      </div>

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

export default BorrowTab;
