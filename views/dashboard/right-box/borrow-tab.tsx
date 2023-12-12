import useCollateralActions from "@/application/collateral/actions";
import useUserActions from "@/application/user/actions";
import { DescentButton, DescentInput } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { InfoAltIcon } from "@/public/icons";
import { formatAmount } from "@/utils";
import { useState } from "react";

const BorrowTab = () => {
  const { collateralState, userState } = useSystemFunctions();
  const { borrowXNGN } = useCollateralActions();
  const { getVaultInfo } = useUserActions();

  const [amount, setAmount] = useState("");

  const { loadingBorrow } = collateralState;
  const { user } = userState;
  const { availablexNGN } = user;

  const xNgn = formatAmount(availablexNGN);

  const valid = amount.length > 0;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    borrowXNGN(amount, {
      onSuccess: () => getVaultInfo(),
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
          max={() => null}
          onChange={(val) => setAmount(val)}
        />

        <div className="mt-3 rounded-xl py-3 px-2 flex gap-1 bg-red-100 text-red-150">
          <div className="w-[17px]">
            <InfoAltIcon />
          </div>
          <div className="text-[10px] md:text-sm">
            Continuing with this amount may risk vault liquidation. Consider a
            lower value that takes you farther away from the minimum allowable
            <span className="font-semibold"> Collateral Ratio</span>.
          </div>
        </div>
      </div>

      <div className="mt-2">
        <DescentButton
          loading={loadingBorrow}
          disabled={!valid || loadingBorrow}
          type="submit"
          text="Continue"
        />
      </div>
    </form>
  );
};

export default BorrowTab;
