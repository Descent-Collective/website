import { motion } from "framer-motion";
import classNames from "classnames";

import { Button } from "./types";

const DescentButton = ({
  onClick,
  text,
  type = "submit",
  disabled,
  loading,
  variant = "primary",
  icon,
}: Button) => {
  if (variant === "secondary") {
    return (
      <div className="relative w-full h-12 rounded-lg bg-black-100">
        <motion.button
          onClick={onClick}
          whileHover={{ top: 0, left: 0 }}
          whileTap={{ scale: 0.9 }}
          initial={{ top: "-9.5%", left: "-0.4%" }}
          transition={{ ease: "backOut" }}
          className={classNames(
            "absolute text-white-50 w-full h-full flex justify-center items-center bg-blue-50 border border-black-100 rounded-lg text-base",
            { "pointer-events-none": loading }
          )}
          disabled={disabled}
          type={type}
        >
          {text}
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      transition={{ ease: "backOut" }}
      className={classNames(
        "w-full h-12 rounded-lg flex justify-center items-center gap-1",
        {
          "pointer-events-none": loading || disabled,
          "bg-blue-100 text-black-50 shadow-alt font-medium text-lg border border-black-100":
            variant === "primary",

          "bg-transparent text-green-50 text-base border-[1.5px] border-green-500":
            variant === "accent",

          "bg-black-150 text-blue-100 text-base": variant === "tertiary",

          "bg-green-100 text-white-50 text-xs":
            variant === "action" && !disabled,

          "bg-grey-100 text-grey-50 text-base": disabled,
        }
      )}
      disabled={disabled}
      type={type}
    >
      {text}

      {icon && icon}
    </motion.button>
  );
};

export default DescentButton;
