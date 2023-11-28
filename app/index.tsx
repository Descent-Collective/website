import { DescentFooter } from "@/components";
import DescentHeader from "@/components/header";
import { ReactNode } from "react";

const AppHome = ({ children }: { children: ReactNode }) => {
  return (
    <main className="font-SF_UI_Display">
      <DescentHeader />
      {children}
      <DescentFooter />
    </main>
  );
};

export default AppHome;
