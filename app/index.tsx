import { ReactNode } from "react";

const AppHome = ({ children }: { children: ReactNode }) => {
  return <main className="container">{children}</main>;
};

export default AppHome;
