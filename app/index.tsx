import DescentHeader from "@/components/header";
import { ReactNode } from "react";

const AppHome = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-6">
      <DescentHeader />
      {children}
    </main>
  );
};

export default AppHome;
