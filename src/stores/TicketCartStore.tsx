import { UUID } from "crypto";
import { create } from "zustand";

/* Ticket detail */
interface TicketData {
  ticketTypeId: UUID;
  price: number;
  seatId: UUID;
  ticketType: string;
}

/* Data model for ticket in cart */
export interface CartItem {
  eventId: UUID;
  eventName: string;
  tickets: TicketData;
}

interface TicketCartState {
  cartTicketsItems: CartItem[];
  isCheckoutActive: boolean;
  changeCheckoutState: () => void;
  addTicket: (item: CartItem) => void;
  removeTicket: (id: UUID) => void;
  getCartTotalPrice: () => number;
  clearCart: () => void;
}

/* State logic for Ticket store */

const useTicketCartStore = create<TicketCartState>()((set, get) => ({
  cartTicketsItems: [],
  isCheckoutActive: false,
  changeCheckoutState: () =>
    set((state) => {
      return { isCheckoutActive: !state.isCheckoutActive };
    }),

  addTicket: (item: CartItem) =>
    set((state) => {
      return { cartTicketsItems: [...state.cartTicketsItems, item] };
    }),
  removeTicket: (id: UUID) =>
    set((state) => ({
      cartTicketsItems: state.cartTicketsItems.filter(
        (ticket) => ticket.tickets.seatId !== id,
      ),
    })),
  getCartTotalPrice: () => {
    const cart = get().cartTicketsItems;
    let sum: number = 0;

    for (const ticket of cart) {
      sum += ticket.tickets.price;
    }

    return sum;
  },
  clearCart: () =>
    set(() => ({
      cartTicketsItems: [],
    })),
}));

export default useTicketCartStore;
