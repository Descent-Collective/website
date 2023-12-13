"use client";
import { DescentFooter, DescentMenu } from "@/components";
import DescentHeader from "@/components/header";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  DashboardBlob1,
  DashboardBlob2,
  DashboardBlob3,
  DashboardBlob4,
} from "@/public/icons";
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

      {/* {isDashboardRoute && (
        <>
          <div className="absolute top-0 right-0">
            <DashboardBlob1 />
          </div>
          <div className="absolute top-3 left-0">
            <DashboardBlob2 />
          </div>
          <div className="absolute -bottom-52 left-0">
            <DashboardBlob3 />
          </div>
          <div className="absolute -bottom-52 right-0">
            <DashboardBlob4 />
          </div>
        </>
      )} */}
    </main>
  );
};

export default AppHome;
