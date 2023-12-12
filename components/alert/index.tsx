import { motion } from "framer-motion";
import { Alert } from "./types";
import classNames from "classnames";
import { ErrorIcon, SuccessIcon } from "@/public/icons";

const Notification = ({ message, show, title, variant }: Alert) => {
  const variants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    show && (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ type: "tween", duration: 0.5 }}
        className={classNames(
          "flex p-5 md:p-6 gap-2 rounded-l-xl shadow-wide-box max-w-[444px] bg-white-50",
          {
            "border-r-[8px] border-green-50": variant === "success",
            "border-r-[8px] border-red-50": variant === "error",
          }
        )}
      >
        {variant === "success" && <SuccessIcon />}
        {variant === "error" && <ErrorIcon />}

        <div>
          <p className="text-black-100 text-base md:text-lg font-semibold">
            {title}
          </p>
          {message}
        </div>
      </motion.div>
    )
  );
};

export default Notification;
