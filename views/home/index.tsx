import {
  ArrowRightIcon,
  BaseIcon,
  LogoIcon,
  MetamaskIcon,
} from "@/public/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import DescentHeader from "@/components/header";
import HeroSection from "./hero";
import SecondSection from "./second-section";
import ThirdSection from "./third-section";

const HomeView = () => {
  return (
    <div>
      <HeroSection />
      <SecondSection />
      <ThirdSection />
    </div>
  );
};

export default HomeView;
