import { create } from "zustand";

/* Basic auth store for login state */

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthStore {
  user: UserData | undefined;
  updateUser: (user: UserData | undefined) => void;
}

const useAuthStore = create<AuthStore>()((set) => ({
  user: undefined,

  updateUser: (user) =>
    set(() => {
      return { user: user };
    }),
}));

export default useAuthStore;
