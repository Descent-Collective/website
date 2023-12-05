import { DescentButton, DescentInput } from "@/components";
import { useState } from "react";

const SupplyTab = () => {
  const [amount, setAmount] = useState("");
  const [generated, setGenerated] = useState("");

  const valid = amount.length > 0;

  const handleChange = (val: string) => {
    setAmount(val);
    const _amount = Number(val);
    const _generated = !_amount ? "" : _amount * 450;

    setGenerated(_generated.toString());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(amount);
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
        labelAlt="0 USDC available"
        placeholder="0.00"
        valid={valid}
        hasMax
        onChange={(val) => handleChange(val)}
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
        <DescentButton disabled={!valid} type="submit" text="Continue" />
      </div>
    </form>
  );
};

export default SupplyTab;
