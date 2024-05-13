import { useFormatPrice, useIsMobile } from "@/hooks";
import useTicketCartStore from "@/stores/TicketCartStore";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";

export interface StepperProps {
  changeStep: Dispatch<SetStateAction<number>>;
}

export const OrderSummary = ({ changeStep }: StepperProps) => {
  const { cartTicketsItems, getCartTotalPrice } = useTicketCartStore(
    (state) => state
  );
  const priceFormat = useFormatPrice().format;
  const isMobile = useIsMobile();
  return (
    <div
      className={classNames(
        "flex flex-col justify-evenly h-full",
        {
          "px-2": isMobile,
        },
        { "px-20": !isMobile }
      )}
    >
      <div className="flex-1 flex flex-col gap-4">
        <h1>Order summary</h1>
        <div className="bg-base-200 h-1/2 rounded-md p-4">
          {cartTicketsItems.map((ticket) => {
            return (
              <div className="flex gap-4 items-center">
                <div className="rounded-full bg-slate-50 size-1"></div>
                <div className="flex w-full justify-between">
                  <p>{ticket.tickets.ticketType}</p>
                  <p className="font-semibold">{priceFormat(ticket.tickets.price)}</p>
                </div>
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
