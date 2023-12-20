import { DescentHint } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { InfoIcon } from "@/public/icons";
import classNames from "classnames";
import { memo } from "react";

const FirstItem = ({
  item,
  index,
  items,
}: {
  item: any;
  index: number;
  items: any[];
}) => {
  const { userState } = useSystemFunctions();

  return (
    <div
      className={classNames("", {
        "pl-3 md:pl-6 pr-10": index === 0,
        "px-3 md:px-10": index > 0,
        "xl:border-r xl:border-grey-700": index < items.length - 1,
      })}
    >
      <div className="flex items-center xl:justify-center gap-1">
        <div className="text-[9px] md:text-sm font-medium text-grey-500 whitespace-nowrap">
          {item.title}
        </div>
        <DescentHint text={item?.hint} />
      </div>
      <div className="mt-2 text-[9.5px] md:text-base font-medium md:font-bold">
        {item.value}
      </div>
    </div>
  );
};

export default memo(FirstItem);
