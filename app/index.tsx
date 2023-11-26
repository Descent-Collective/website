import DescentHeader from "@/components/header";
import { ReactNode } from "react";

const AppHome = ({ children }: { children: ReactNode }) => {
  return (
    <main className="container mx-auto px-5 2xl:px-0">
      <DescentHeader />
      {children}
    </main>
  );
};

export default AppHome;
