import type { SVGProps } from "react";

type LupaIconProps = SVGProps<SVGSVGElement> & { size?: number };

export function LupaIcon({ size =18, ...props }: LupaIconProps) {
 return (
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width={size}
 height={size}
 viewBox="002424"
 fill="none"
 stroke="currentColor"
 strokeWidth={2}
 strokeLinecap="round"
 strokeLinejoin="round"
 aria-hidden="true"
 {...props}
 >
 <circle cx="11" cy="11" r="8" />
 <path d="m2121-4.3-4.3" />
 </svg>
 );
}
