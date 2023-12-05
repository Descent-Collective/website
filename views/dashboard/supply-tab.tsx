import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DescentButton, DescentInput } from "@/components";
import { useState } from "react";

interface FormProp {
  amount: string;
}

const schema = yup.object().shape({
  amount: yup.string().required("Amount is required"),
});

const SupplyTab = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormProp>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [generated, setGenerated] = useState("");

  const handleChange = (val: string) => {
    const _amount = Number(val);
    const _generated = !_amount ? "" : _amount * 450;

    setGenerated(_generated.toString());
  };

  const onSubmit = async (values: FormProp) => {
    console.log(values);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 md:gap-6"
    >
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
        register={register("amount")}
        placeholder="0.00"
        valid={isValid}
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
        <DescentButton disabled={isValid} type="submit" text="Continue" />
      </div>
    </form>
  );
};

export default SupplyTab;
