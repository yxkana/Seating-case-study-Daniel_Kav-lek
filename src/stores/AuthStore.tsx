import { UUID } from "crypto";
import { get } from "http";
import { create } from "zustand";

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
