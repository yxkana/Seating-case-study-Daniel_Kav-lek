import { useFormatPrice } from "@/hooks";
import useTicketCartStore from "@/stores/TicketCartStore";
import { Dispatch, SetStateAction } from "react";

export interface StepperProps {
  changeStep: Dispatch<SetStateAction<number>>;
}

export const OrderSummary = ({ changeStep }: StepperProps) => {
  const { cartTicketsItems, getCartTotalPrice } = useTicketCartStore(
    (state) => state
  );
  const priceFormat = useFormatPrice().format;
  return (
    <div className="flex flex-col justify-evenly h-full px-20">
      <div className="flex-1 flex flex-col gap-4">
        <h1>Order summary</h1>
        <div className="bg-base-200 h-1/2 rounded-md p-4">
          {cartTicketsItems.map((ticket) => {
            return (
              <div className="flex gap-4 items-center">
                <div className="rounded-full bg-slate-50 size-1"></div>
                <span>{ticket.tickets.ticketType}</span>
                <span>{priceFormat(ticket.tickets.price)}</span>
              </div>
            );
          })}
        </div>
        <span>{"Total Amount " + priceFormat(getCartTotalPrice())}</span>
      </div>
      <button
        onClick={() => changeStep(1)}
        className="btn btn-primary w-52 ml-auto"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};
