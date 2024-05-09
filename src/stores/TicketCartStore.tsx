import { UUID } from "crypto";
import { create } from "zustand";

interface TicketData {
  ticketTypeId: UUID;
  price: number;
  seatId: UUID;
  ticketType: string;
}

export interface CartItem {
  eventId: UUID;
  eventName: string;
  tickets: TicketData;
}

interface TicketCartState {
  cartTicketsItems: CartItem[];
  addTicket: (item: CartItem) => void;
  removeTicket: (id: UUID) => void;
}

const useTicketCartStore = create<TicketCartState>()((set) => ({
  cartTicketsItems: [],
  addTicket: (item: CartItem) =>
    set((state) => {
      return { cartTicketsItems: [...state.cartTicketsItems, item] };
    }),
  removeTicket: (id: UUID) =>
    set((state) => ({
      cartTicketsItems: state.cartTicketsItems.filter(
        (ticket) => ticket.tickets.seatId !== id
      ),
    })),
}));

export default useTicketCartStore;
