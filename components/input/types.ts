export interface Input {
  label: string;
  labelAlt?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  name: string;
  disabled?: boolean;
  valueAlt?: string;
  placeholder?: string;
  valid?: boolean;
  max?: () => void;
  value?: string;
  onChange?: (val: string) => void;
}
