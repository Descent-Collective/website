import { DescentButton } from "@/components";
import { InfoIcon } from "@/public/icons";
import classNames from "classnames";

const ThirdItem = ({
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
      className={classNames("", {
        "xl:border-r xl:border-grey-700": index < items.length - 1,
        "px-3 md:pl-6 md:pr-10 xl:pr-12": index === 0,
        "px-3 md:px-10 xl:px-12": index > 0,
      })}
    >
      <div className="flex items-center gap-3 xl:gap-5">
        <div>
          <div className="text-[9px] md:text-sm font-medium text-grey-500 whitespace-nowrap">
            {item.title}
          </div>
          <div className="mt-2 text-[9.5px] md:text-base font-medium md:font-bold whitespace-nowrap">
            {item.value}
          </div>
        </div>

        {item.buttonText && (
          <div className="hidden md:block md:min-w-[70px]">
            <DescentButton disabled variant="action" text={item.buttonText} />
          </div>
        )}
      </div>

      {item.buttonText && (
        <div className="md:hidden min-w-[50px] mt-2">
          <DescentButton disabled variant="action" text={item.buttonText} />
        </div>
      )}
    </div>
  );
};

export default ThirdItem;
