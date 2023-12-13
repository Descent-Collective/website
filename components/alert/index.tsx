import { motion } from "framer-motion";
import classNames from "classnames";

import { ErrorIcon, SuccessIcon } from "@/public/icons";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const DescentAlert = () => {
  const { alertState } = useSystemFunctions();

  const { alert } = alertState;

  const variants = {
    initial: { x: "50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "50%", opacity: 0 },
  };

  return (
    alert?.title && (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ type: "tween", duration: 0.5 }}
        className={classNames(
          "flex p-3 md:p-6 gap-[10px] rounded-l-xl shadow-wide-box max-w-[90%] md:max-w-[444px] bg-white-50 fixed top-16 right-1 md:right-12 xl:right-[60px] z-[9999]",
          {
            "border-r-[8px] border-green-50": alert?.variant === "success",
            "border-r-[8px] border-red-50": alert?.variant === "error",
          }
        )}
      >
        <div className="w-10">
          {alert?.variant === "success" && <SuccessIcon />}
          {alert?.variant === "error" && <ErrorIcon />}
        </div>

        <div>
          <p className="text-black-100 text-sm md:text-lg font-semibold">
            {alert?.title}
          </p>

          <div className="text-xs md:text-sm font-medium text-grey-500 mt-2">
            {alert?.message}
          </div>
        </div>
      </motion.div>
    )
  );
};

export default DescentAlert;
