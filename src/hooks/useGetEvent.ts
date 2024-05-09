import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/lib/constants";
import { UUID } from "crypto";

export interface eventData {
  eventId: UUID;
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
      id: UUID;
      name: "VIP ticket" | "Regular ticket";
      price: number;
    }
  ];
  seatRows: [
    {
      seatRow: number;
      seats: [
        {
          seatId: UUID;
          place: number;
          ticketTypeId: UUID;
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
