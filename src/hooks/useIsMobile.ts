import { useWindowSize } from "usehooks-ts";

export const useIsMobile = () => {
  const { width = 0 } = useWindowSize();

  if (width <= 1028) {
    return true;
  }

  return false;
};
