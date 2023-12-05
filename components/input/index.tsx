import classNames from "classnames";
import { Input } from "./types";
import { DescentClickAnimation } from "..";
import { useState } from "react";

const DescentInput = (props: Input) => {
  const {
    type,
    disabled,
    register,
    label,
    labelAlt,
    name,
    placeholder,
    valid,
    hasMax,
    valueAlt,
    value,
    onChange,
  } = props;

  const [valueText, setValue] = useState("");

  const checkIfNumber = (value: string) => {
    if (value === "") return true;
    const regex = /^[0-9\b]+$/;
    return regex.test(value);
  };

  const handleOnChange = (e: any) => {
    const value = e.target.value;
    const valueWithoutComma = value.replace(/,/g, "");

    if (Number(valueWithoutComma) === 0) {
      setValue("");
      onChange && onChange("");
      return;
    }

    if (checkIfNumber(valueWithoutComma)) {
      const val = Number(valueWithoutComma).toLocaleString();
      setValue(val);

      onChange && onChange(valueWithoutComma);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={name} className="text-[9px] md:text-xs">
          {label}
        </label>
        <div className="text-[9px] md:text-xs text-grey-500 font-medium">
          {labelAlt}
        </div>
      </div>
      <div
        className={classNames(
          "rounded-lg bg-white-300 border px-3 py-[5px] md:px-4 md:py-[15px] flex items-center justify-between",
          {
            "border-black-100": !disabled,
            "border-grey-850": disabled,
          }
        )}
      >
        <div>
          <input
            id={name}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            {...register}
            value={value || valueText}
            className={classNames(
              "border-none text-xs md:text-xl font-medium bg-transparent outline-none",
              {
                "text-black-100 placeholder:text-black-100": !disabled,
                "text-grey-500 placeholder:text-grey-500": disabled,
              }
            )}
            onChange={handleOnChange}
          />

          <div className="text-grey-800 font-medium text-[8px] md:text-xs mt-1">
            ~ {valueAlt}
          </div>
        </div>

        {hasMax && (
          <DescentClickAnimation>
            <div
              className={classNames(
                "py-1 px-[10px] bg-white-350 rounded text-[8px] md:text-xs cursor-pointer",
                {
                  "text-black-100": valid,
                  "text-grey-500": !valid,
                }
              )}
            >
              Max
            </div>
          </DescentClickAnimation>
        )}
      </div>
    </div>
  );
};

export default DescentInput;
