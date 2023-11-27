import { DescentFooter } from "@/components";
import DescentHeader from "@/components/header";
import { ReactNode } from "react";

const AppHome = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <DescentHeader />
      {children}
      <DescentFooter />
    </main>
  );
};

export default AppHome;
