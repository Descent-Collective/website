import { DescentContainer } from "@/components";
import { useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const ThirdSection = () => {
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
              key={0}
            />

            <div className="pt-8 md:pt-[60px]">
              <SliderComponent
                isPercentage
                title="What is your target collateral ratio?"
                key={1}
              />
            </div>
          </div>

          <div className="md:pl-8 xl:pl-16 md:border-l border-grey-450">
            <div className="md:pt-5">
              <p className="text-base md:text-xl">
                How much can your collateral generate?
              </p>
              <p className="text-xl md:text-2xl font-medium mt-2">
                220,000 xNGN
              </p>
            </div>

            <div className="mt-8 md:mt-[60px]">
              <p className="text-base md:text-xl">Interest Rate</p>
              <p className="text-xl md:text-2xl font-medium mt-2 pb-2">2.50%</p>
              <p className="text-xs md:text-sm text-grey-500">
                <span className="text-red-50">*</span>This is the amount that
                you can generate at 150% collateralization ratio. We recommend
                keeping you collateralization ratio higher and generating less
                to keep your position open, in case the value of your USDC
                collateral drops.
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
  isPercentage,
}: {
  title: string;
  isPercentage?: boolean;
}) => {
  const [value, setValue] = useState(isPercentage ? 150 : 1000);

  const handleChangeStart = () => {
    console.log("Change event started");
  };

  const handleChange = (value: number) => {
    setValue(value);
  };

  const handleChangeComplete = () => {
    console.log("Change event completed");
  };
  return (
    <div>
      <p className="text-base md:text-xl">{title}</p>
      <p className="text-xl md:text-2xl font-medium mt-2 pb-3">
        {value.toLocaleString()}
        {isPercentage ? "%" : " USDC"}
      </p>

      <div className="slider">
        <Slider
          min={isPercentage ? 5 : 50}
          max={isPercentage ? 2000 : 10000}
          value={value}
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
