import { CartDropdown, LoginDropdown } from "./components";

export const Topbar = () => {

  return (
    <div className="px-10">
      <div className="navbar">
        <div className="flex-1">
          <a className="text-2xl font-semibold">Ticketer</a>
        </div>
        <div className="flex-none gap-2">
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
