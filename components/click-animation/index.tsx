import { motion } from "framer-motion";
import { ClickAnimation } from "./types";

const DescentClickAnimation = ({ children }: ClickAnimation) => {
  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }}>
      {children}
    </motion.div>
  );
};

export default DescentClickAnimation;
