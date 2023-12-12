import { useState } from "react";
import { DescentButton, DescentInput } from "@/components";

const RepayModal = ({ close }: { close: () => void }) => {
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
          labelAlt="150,000.00 xNGN debt"
          placeholder="0.00"
          valid={valid}
          max={() => null}
          onChange={(val) => setAmount(val)}
        />
      </div>

      <div className="mt-2">
        <div>
          <DescentButton disabled={!valid} type="submit" text="Continue" />
        </div>

        <div className="mt-4">
          <DescentButton onClick={close} variant="info" text="Cancel" />
        </div>
      </div>
    </form>
  );
};

export default RepayModal;
