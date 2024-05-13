import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { api } from "@/lib/constants";
import { UUID } from "crypto";
import { UserData } from "@/stores/AuthStore";

export interface PostCartTicketData {
  ticketTypeId: UUID;
  seatId: UUID;
}

interface PostCartOrderData {
  eventId: UUID;
  tickets: PostCartTicketData[];
  user: UserData;
}

export interface PostCartOrderResponseData {
  message: string;
  orderId: UUID;
  tickets: [];
  user: UserData;
  totalAmount: number;
}

export const usePostCartOrder = () => {
  return useMutation<PostCartOrderResponseData, Error, PostCartOrderData>({
    mutationKey: ["postOrder"],
    mutationFn: async ({ eventId, tickets, user }: PostCartOrderData) => {
      const data = await axios.post<PostCartOrderResponseData>(`${api}/order`, {
        eventId,
        tickets,
        user,
      });

      return data.data;
    },
  });
};
