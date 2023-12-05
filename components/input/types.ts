import { UseFormRegisterReturn } from "react-hook-form";

export interface Input {
  label: string;
  labelAlt?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  register?: UseFormRegisterReturn;
  name: string;
  disabled?: boolean;
  valueAlt?: string;
  placeholder?: string;
  valid?: boolean;
  hasMax?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}
