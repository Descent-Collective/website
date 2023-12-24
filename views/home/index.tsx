import HeroSection from "./hero";
import SecondSection from "./second-section";
import ThirdSection from "./third-section";
import FourthStep from "./fourth-step";
import useCollateralActions from "@/application/collateral/actions";
import useUserActions from "@/application/user/actions";
import { useEffect } from "react";

const HomeView = () => {
  const { getCollateralInfo } = useCollateralActions();

  const connectToDescent = async () => {
  
      getCollateralInfo();
    
  };

  useEffect(() => {
    connectToDescent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <HeroSection />
      <SecondSection />
      <ThirdSection />
      <FourthStep />
    </div>
  );
};

export default HomeView;
