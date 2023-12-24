import { DescentContainer } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const ThirdSection = () => {
  const { collateralState } = useSystemFunctions();

  const { collateral } = collateralState;

  const [usdcValue, setUsdcValue] = useState(100);
  const [collateralRatioValue, setCollateralRatioValue] = useState(30);

  const collateralPrice = collateral.collateralPrice;
  const collateralWorthInCurrency = Number(usdcValue) * Number(collateralPrice);
  const generatedxNGN =
    (collateralWorthInCurrency * Number(collateralRatioValue)) / 100;

  return (
    <DescentContainer>
      <section className="mt-16 md:mt-[100px] py-12 px-8 xl:py-[100px] xl:px-[92px] rounded-3xl border border-grey-350 bg-white-250">
        <h4 className="text-center text-lg md:text-[22px] font-medium text-grey-200">
          Find out how much xNGN you can borrow using USDC.
        </h4>

        <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
          <div className="text-black-100 md:pr-8 xl:pr-16">
            <SliderComponent
              title="How much collateral do you want to deposit?"
              value={usdcValue}
              setValue={setUsdcValue}
              key={0}
            />

            <div className="pt-8 md:pt-[60px]">
              <SliderComponent
                isPercentage
                title="What is your target collateral ratio?"
                value={collateralRatioValue}
                setValue={setCollateralRatioValue}
                key={1}
              />
            </div>
          </div>

          <div className="md:pl-8 xl:pl-16 md:border-l border-grey-450">
            <div className="md:pt-5">
              <p className="text-base md:text-xl">
                How much can you collateral generate?
              </p>
              <p className="text-xl md:text-2xl font-medium mt-2">
                {generatedxNGN?.toLocaleString?.()} xNGN
              </p>
            </div>

            <div className="mt-8 md:mt-[60px]">
              <p className="text-base md:text-xl">Interest Rate</p>
              <p className="text-xl md:text-2xl font-medium mt-2 pb-2">
                {Number(collateral.rate).toPrecision(2)}%
              </p>
              <p className="text-xs md:text-sm text-grey-500">
                This is an annual percentage yield calculated on top of how much
                Currency(xNGN) has been generated.
                <span className="text-red-50">*</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </DescentContainer>
  );
};

const SliderComponent = ({
  title,
  value,
  setValue,
  isPercentage,
}: {
  title: string;
  value: number;
  setValue: (val: number) => void;
  isPercentage?: boolean;
}) => {
  const [val, setVal] = useState(value);

  const handleChangeStart = () => {
    console.log("Change event started");
  };

  const handleChange = (_val: number) => {
    setVal(_val);
  };

  const handleChangeComplete = () => {
    setValue(val);
  };
  return (
    <div>
      <p className="text-base md:text-xl">{title}</p>
      <p className="text-xl md:text-2xl font-medium mt-2 pb-3">
        {val.toLocaleString()}
        {isPercentage ? "%" : " USDC"}
      </p>

      <div className="slider">
        <Slider
          min={isPercentage ? 1 : 50}
          max={isPercentage ? 100 : 10000}
          value={val}
          onChangeStart={handleChangeStart}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
          tooltip={false}
        />
      </div>
    </div>
  );
};

export default ThirdSection;
