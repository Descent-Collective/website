/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";

import { DescentButton, DescentContainer } from "@/components";
import { ArrowRightAccent, UsdcIcon } from "@/public/icons";
import { useEffect, useState } from "react";

interface IComponent {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const tabContents = [
  {
    title: "Capital Efficient",
    description:
      "Capital Efficient Buy xNGN on the market or generate xNGN with Descent protocol. Generate xNGN and keep your exposure to the whole collateral. Pay a low, fixed interest rate.",
    icon: <UsdcIcon />,
  },
  {
    title: "Fully backed by collateral",
    description:
      "Every Currency (xNGN) minted is backed by an underlying collateral(USDC). Descent Protocol's efficient liquidation mechanism allows users to get the most liquidity for their USDC.",
    icon: <UsdcIcon />,
  },
  {
    title: "Unstoppable Stablecoin",
    description:
      "Currencies (xNGN) generated are decentralized and capable of resisting all kinds of censorship.",
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
    <DescentContainer>
      <section className="mt-20 md:mt-[100px] flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8 xl:gap-12">
        <div className="flex items-center gap-6 md:w-[60%] h-56">
          <div className="flex flex-col items-center justify-center gap-2">
            {sections.map((_, index) => (
              <AnimatedTab
                key={index}
                onClick={() => setCurrentTab(index)}
                isActive={index === currentTab}
              />
            ))}
          </div>

          {sections[currentTab]}
        </div>

        <div className="border-[0.5px] border-green-50 bg-white-200 rounded-3xl p-9 xl:p-[58px] flex flex-col justify-center items-start gap-5 md:w-[40%]">
          <p className="text-base font-bold text-grey-400">Discover xNGN</p>
          <h4 className="font-Space_Mono text-2xl md:text-3xl xl:text-[40px] font-bold text-black-100">
            1xNGN ≈ 1NGN
          </h4>
          <p className="text-sm md:text-lg md:leading-[30px]  text-black-100">
            A digital currency for a new internet financial system. Generate
            currencies (xNGN) anytime, anywhere!
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
    </DescentContainer>
  );
};

const AnimatedTab = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      className="w-1 md:w-[6px] rounded bg-green-50 cursor-pointer"
      animate={{
        y: isActive ? 0 : -2,
        opacity: isActive ? 1 : 0.2,
        height: isActive ? 48 : 32,
      }}
      transition={{ duration: 0.5, ease: "linear" }}
      onClick={onClick}
    />
  );
};

const AnimateComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
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
