import { SVGProps } from "react";

export const BackIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="currentColor"
          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        ></path>
        <path
          fill="currentColor"
          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        ></path>
      </g>
    </svg>
  );
};
