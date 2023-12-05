"use client";
import { DescentFooter, DescentMenu } from "@/components";
import DescentHeader from "@/components/header";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import classNames from "classnames";
import { ReactNode } from "react";

const AppHome = ({ children }: { children: ReactNode }) => {
  const { pathname } = useSystemFunctions();

  const isDashboardRoute = pathname.includes("/app");

  return (
    <main className="font-SF_UI_Display">
      <DescentHeader />
      <div
        className={classNames({
          "": isDashboardRoute,
        })}
      >
        {children}
      </div>
      <DescentFooter />
      <DescentMenu />
    </main>
  );
};

export default AppHome;
