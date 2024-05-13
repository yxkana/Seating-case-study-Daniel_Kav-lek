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
              className="btn-base300 avatar btn btn-circle"
            >
              <UserIcon />
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
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
              className="btn-base-300 btn btn-square px-10"
            >
              {"Login"}
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content  menu-lg z-[1] mt-3 rounded-box bg-base-100 p-4 shadow"
            >
              <LoginForm />
            </ul>
          </div>
        </>
      )}
    </>
  );
};
