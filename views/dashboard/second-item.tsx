import { InfoIcon } from "@/public/icons";

const SecondItem = ({ item }: { item: any }) => {
  return (
    <div>
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

export default SecondItem;
