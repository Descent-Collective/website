/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";

import { DescentButton } from "@/components";
import { ArrowRightAccent, UsdcIcon } from "@/public/icons";
import { useEffect, useState } from "react";

interface IComponent {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const tabContents = [
  {
    title: "Fully backed by collateral",
    description:
      "xNGN uses algorithmic mechanisms to maintain it's peg to the price of Naira. Descent Protocol's efficient liquidation mechanism allows users to get the most liquidity for their USDC.",
    icon: <UsdcIcon />,
  },
  {
    title: "Tellus at urna condimentum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. In nibh mauris cursus mattis molestie.",
    icon: <UsdcIcon />,
  },
  {
    title: "Quam lacus suspendisse fau",
    description:
      "Massa tincidunt nunc pulvinar sapien et. Urna et pharetra pharetra massa massa. Fames ac turpis egestas integer. Ut tortor pretium viverra suspendisse.",
    icon: <UsdcIcon />,
  },
];

const SecondSection = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const sections = [
    <Component key={0} {...tabContents[currentTab]} />,
    <Component key={1} {...tabContents[currentTab]} />,
    <Component key={2} {...tabContents[currentTab]} />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTab((current) =>
        current === sections.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [sections.length]);
  return (
    <section className="mt-20 md:mt-[100px] flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8 xl:gap-12">
      <div className="flex items-center gap-6 md:w-[60%] h-56">
        <div className="flex flex-col items-center justify-center gap-2">
          {sections.map((_, index) => (
            <AnimatedTab key={index} isActive={index === currentTab} />
          ))}
        </div>

        {sections[currentTab]}
      </div>

      <div className="border-[0.5px] border-green-50 bg-white-200 rounded-3xl p-9 xl:p-[58px] flex flex-col justify-center items-start gap-5 md:w-[40%]">
        <p className="text-base font-bold text-grey-400">Discover xNGN</p>
        <h4 className="text-2xl md:text-3xl xl:text-[40px] font-bold text-black-100">
          1xNGN ≈ 1NGN
        </h4>
        <p className="text-sm md:text-lg md:leading-[30px]  text-black-100">
          A digital currency independent from banks. Generate or buy at ease.
          Spend on your own terms.
        </p>
        <div className="min-w-[210px]">
          <DescentButton
            variant="accent"
            icon={<ArrowRightAccent />}
            text="Read more in Docs"
          />
        </div>
      </div>
    </section>
  );
};

const AnimatedTab = ({ isActive }: { isActive: boolean }) => {
  return (
    <motion.div
      className="w-1 md:w-[6px] rounded bg-green-50"
      animate={{
        y: isActive ? 0 : -2,
        opacity: isActive ? 1 : 0.2,
        height: isActive ? 48 : 32,
      }}
      transition={{ duration: 0.5, ease: "linear" }}
    />
  );
};

const AnimateComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
};

const Component = ({ title, description, icon }: IComponent) => {
  return (
    <AnimateComponent>
      <div className="flex items-center justify-between">
        <div className="xl:w-[55%]">
          <h4 className="text-lg md:text-2xl font-bold text-black-100">
            {title}
          </h4>
          <p className="mt-2 leading-[32px] text-sm md:text-lg">
            {description}
          </p>
        </div>

        <div className="hidden xl:block">{icon}</div>
      </div>
    </AnimateComponent>
  );
};

export default SecondSection;
