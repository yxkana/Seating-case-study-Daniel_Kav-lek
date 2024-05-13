import useAuthStore from "@/stores/AuthStore";
import { UserIcon } from "lucide-react";
import { LoginForm } from "../form";
import { closePopup } from "@/lib/utils";
export const LoginDropdown = () => {
  const { user, updateUser } = useAuthStore((state) => state);
  return (
    <>
      {user ? (
        <>
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-base300 btn-circle avatar"
            >
              <UserIcon />
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  onClick={() => {
                    /* Logout */
                    updateUser(undefined);
                    closePopup();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-base-300 btn-square px-10"
            >
              {"Login"}
            </button>
            <ul
              tabIndex={0}
              className="menu menu-lg  dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box"
            >
              <LoginForm />
            </ul>
          </div>
        </>
      )}
    </>
  );
};
