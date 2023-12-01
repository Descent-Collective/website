import classNames from "classnames";
import { useState } from "react";

const RightBox = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Supply", "Borrow"];
  return (
    <div className="hidden p-10 rounded-xl lg:flex lg:flex-col gap-6 lg:w-[33%] w-[35%] shadow-wide-box">
      <div className="rounded-lg tab h-8 p-[2px] flex">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={classNames(
              "cursor-pointer h-full flex justify-center items-center text-black-100 font-semibold text-[13px] w-1/2 transition-all duration-700 ease-in-out",
              {
                "rounded-[7px] bg-white-50 tab-shadow": index === activeTab,
              }
            )}
          >
            {tab}
          </div>
        ))}
      </div>

      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">
          Supply collateral
        </div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Fund your vault with USDC
        </div>
      </div>
    </div>
  );
};

export default RightBox;
