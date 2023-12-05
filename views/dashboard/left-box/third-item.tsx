import { useState } from "react";
import classNames from "classnames";
import { DescentButton, DescentInput, DescentModal } from "@/components";

const ThirdItem = ({
  item,
  index,
  items,
}: {
  item: any;
  index: number;
  items: any[];
}) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <div
        className={classNames("", {
          "xl:border-r xl:border-grey-700": index < items.length - 1,
          "px-3 md:pl-6 md:pr-10 xl:pr-12": index === 0,
          "px-3 md:px-10 xl:px-12": index > 0,
        })}
      >
        <div className="flex items-center gap-3 xl:gap-5">
          <div>
            <div className="text-[9px] md:text-sm font-medium text-grey-500 whitespace-nowrap">
              {item.title}
            </div>
            <div className="mt-2 text-[9.5px] md:text-base font-medium md:font-bold whitespace-nowrap">
              {item.value}
            </div>
          </div>

          {item.buttonText && (
            <div className="hidden md:block md:min-w-[70px]">
              <DescentButton
                disabled={item.disabled}
                variant="action"
                text={item.buttonText}
                onClick={handleModal}
              />
            </div>
          )}
        </div>

        {item.buttonText && (
          <div className="md:hidden min-w-[50px] mt-2">
            <DescentButton
              disabled={item.disabled}
              variant="action"
              text={item.buttonText}
              onClick={handleModal}
            />
          </div>
        )}
      </div>

      {open && (
        <DescentModal close={handleModal}>
          <ActionModal close={handleModal} />
        </DescentModal>
      )}
    </>
  );
};

const ActionModal = ({ close }: { close: () => void }) => {
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
          hasMax
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

export default ThirdItem;
