import React from "react";

export type Alert = {
  variant: "success" | "error";
  message: React.ReactNode;
  title: string;
  show: boolean;
};
