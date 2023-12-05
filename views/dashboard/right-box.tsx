import { useState } from "react";
import classNames from "classnames";
import SupplyTab from "./supply-tab";
import BorrowTab from "./borrow-tab";

const RightBox = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Supply", "Borrow"];

  const tabComponents = [<SupplyTab />, <BorrowTab />];
  return (
    <div className="hidden p-10 rounded-xl lg:flex lg:flex-col gap-6 lg:w-[33%] w-[35%] shadow-wide-box lg:-mt-3 transition-all">
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

      {tabComponents[activeTab]}
    </div>
  );
};

export default RightBox;
