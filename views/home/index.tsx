import { DescentContainer, DescentHeader } from "@/components";
import { LogoIcon } from "@/public/icons";

const HomeView = () => {
  return (
    <div id="vertical" className="relative min-h-screen bg-white-50">
      <div
        id="horizontal"
        className="absolute top-0 left-0 bottom-0 right-0 h-full"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 h-full white-bg z-10" />

      <div className="relative z-50">
        <DescentHeader />
      </div>
    </div>
  );
};

export default HomeView;
