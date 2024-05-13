import { CartDropdown, LoginDropdown } from "./components";
import classNames from "classnames";
import { useIsMobile } from "@/hooks";
export const Topbar = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={classNames("px-10 pt-2", { "px-2": isMobile })}>
      <div className="navbar">
        <div className="flex-1">
          <a className="text-2xl font-semibold">Ticketer</a>
        </div>
        <div className="flex-none gap-4">
          {/* Cart Component */}
          <CartDropdown />
          {/* Login component */}
          <LoginDropdown />
        </div>
      </div>
      <div className="divider m-0"></div>
    </div>
  );
};
