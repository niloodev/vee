import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  prefix?: ReactNode;
  hint?: string;
  error?: string;
  mono?: boolean;
}
