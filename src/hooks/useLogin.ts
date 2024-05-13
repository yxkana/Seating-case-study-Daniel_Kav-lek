import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/lib/constants";
import { UserData } from "@/stores/AuthStore";

interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponseData {
  message: string;
  user: UserData;
}

export const useLogin = () => {
  return useMutation<LoginResponseData, Error, LoginBody>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      const data = await axios.post(`${api}/login`, {
        email,
        password,
      });

      return data.data;
    },
  });
};
