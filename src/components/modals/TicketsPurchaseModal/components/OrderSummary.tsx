import { useFormatPrice, useIsMobile } from "@/hooks";
import useTicketCartStore from "@/stores/TicketCartStore";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";

export interface StepperProps {
  changeStep: Dispatch<SetStateAction<number>>;
}

export const OrderSummary = ({ changeStep }: StepperProps) => {
  const { cartTicketsItems, getCartTotalPrice } = useTicketCartStore(
    (state) => state,
  );
  const priceFormat = useFormatPrice().format;
  const isMobile = useIsMobile();
  return (
    <div
      className={classNames(
        "flex h-full flex-col justify-evenly",
        {
          "px-2": isMobile,
        },
        { "px-20": !isMobile },
      )}
    >
      <div className="flex flex-1 flex-col gap-4">
        <h1>Order summary</h1>
        <ul className="h-1/2 rounded-md bg-base-200 p-4 overflow-auto">
          {cartTicketsItems.map((ticket) => {
            return (
              <li
                key={ticket.tickets.seatId}
                className="flex items-center gap-4"
              >
                <div className="size-1 rounded-full bg-slate-50"></div>
                <div className="flex w-full justify-between">
                  <p>{ticket.tickets.ticketType}</p>
                  <p className="font-semibold">
                    {priceFormat(ticket.tickets.price)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <span>{"Total Amount " + priceFormat(getCartTotalPrice())}</span>
      </div>
      <button
        onClick={() => changeStep(1)}
        className="btn btn-primary ml-auto w-52"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};
