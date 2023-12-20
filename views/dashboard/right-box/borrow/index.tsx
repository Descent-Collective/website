import { useState } from "react";

import useCollateralActions from "@/application/collateral/actions";
import { DescentButton, DescentInput } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { formatAmount } from "@/utils";

const errorMessage = (
  <div>
    Continuing with this amount may risk vault liquidation. Consider a lower
    value that takes you farther away from the minimum
    <span className="font-semibold underline ml-1">Collateral Ratio</span>.
  </div>
);

const BorrowTab = () => {
  const { collateralState, userState } = useSystemFunctions();
  const { borrowXNGN } = useCollateralActions();

  const [amount, setAmount] = useState("");

  const { loadingBorrow, loadingApproveBorrow } = collateralState;
  const { user } = userState;
  const { availablexNGN } = user;

  const loading = loadingApproveBorrow || loadingBorrow;
  const xNgn = formatAmount(availablexNGN);

  const amountWithoutComma = amount.replace(/,/g, "");
  const error =
    Number(amountWithoutComma) > Number(availablexNGN) ? errorMessage : "";

  const valid = amount.length > 0;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const amountWithoutComma = amount.replace(/,/g, "");

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

      <DescentInput
        name="amount"
        valueAlt={"0.00 USD"}
        label="xNGN to Borrow"
        labelAlt={`${xNgn} xNGN available`}
        placeholder="0.00"
        max={availablexNGN}
        onChange={setAmount}
        error={error}
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

export default BorrowTab;
