import { SVGProps } from 'react';

export function Logo(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={12} cy={12} r={12} fill="#afeeef" />
    </svg>
  );
}
