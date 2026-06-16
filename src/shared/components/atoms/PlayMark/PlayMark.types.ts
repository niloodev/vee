import type { SVGProps } from "react";

export interface PlayMarkProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: number;
  animated?: boolean;
}
