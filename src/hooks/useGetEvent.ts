import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/lib/constants";

export interface eventData {
  eventId: string;
  namePub: string;
  description: string;
  currencyIso: string;
  dateFrom: Date;
  dateTo: Date;
  headerImageUrl: string;
  place: string;
}

export interface seatsData {
  ticketTypes: [
    {
      id: string;
      name: "VIP ticket" | "Regular ticket";
      price: number;
    }
  ];
  seatRows: [
    {
      seatRow: number;
      seats: [
        {
          seatId: string;
          place: number;
          ticketTypeId: string;
        }
      ];
    }
  ];
}

export const useGetEvent = () => {
  return useQuery({
    queryKey: ["getEvent"],
    queryFn: async () => {
      const data = await axios.get(`${api}/event`).then(async (results) => {
        const { data } = await axios.get(
          `${api}/event-tickets?eventId=${results.data.eventId}`
        );

        return {
          event: results.data as eventData,
          seatings: data as seatsData,
        };
      });

      return data;
    },
    refetchOnWindowFocus: false,
  });
};
