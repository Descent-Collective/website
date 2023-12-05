import { DescentButton, DescentInput } from "@/components";
import { InfoAltIcon } from "@/public/icons";
import { useState } from "react";

const BorrowTab = () => {
  const [amount, setAmount] = useState("");

  const valid = amount.length > 0;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(amount);
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
          labelAlt="162,000 xNGN available"
          placeholder="0.00"
          valid={valid}
          hasMax
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
        <DescentButton disabled={!valid} type="submit" text="Continue" />
      </div>
    </form>
  );
};

export default BorrowTab;
