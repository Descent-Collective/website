import { InfoIcon } from "@/public/icons";
import classNames from "classnames";

const FirstItem = ({
  item,
  index,
  items,
}: {
  item: any;
  index: number;
  items: any[];
}) => {
  return (
    <div
      className={classNames("px-3 md:px-6", {
        "xl:border-r xl:border-grey-700": index < items.length - 1,
      })}
    >
      <div className="flex items-center xl:justify-center gap-1">
        <div className="text-[9px] md:text-sm font-medium text-grey-500">
          {item.title}
        </div>
        <div className="cursor-pointer">
          <InfoIcon />
        </div>
      </div>
      <div className="mt-2 text-[10px] md:text-base font-bold">
        {item.value}
      </div>
    </div>
  );
};

export default FirstItem;
