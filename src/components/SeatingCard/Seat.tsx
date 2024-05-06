import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { seatsData } from "@/hooks";
import { cn } from "@/lib/utils.ts";
import React from "react";
import { useFormatPrice } from "@/hooks";
import { CoinsIcon, TicketIcon } from "../icons";
import classNames from "classnames";

type SeatData = Pick<seatsData, "seatRows">;
type TicketType = Pick<seatsData, "ticketTypes">;
type TicketOnly = TicketType["ticketTypes"][number];
type SeatOnly = SeatData["seatRows"][number]["seats"][number];

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  seat: SeatOnly;
  ticketType: TicketOnly[];
}
export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
  (props, ref) => {
    const isInCart = false;
    const priceFormat = useFormatPrice();

    const showTicketType = () => {
      return props.ticketType.filter(
        (item) => item.id !== props.seat.ticketTypeId
      )[0];
    };

    const ticket: TicketOnly = showTicketType();

    return (
      <Popover>
        <PopoverTrigger>
          <div
            className={classNames(
              "kbd my-1 hover:cursor-pointer text-white",
              { "bg-vipTicket-100": ticket.name === "VIP ticket" },
              { "bg-regularTicket-100": ticket.name === "Regular ticket" }
            )}
            ref={ref}
          >
            <span className="text-xs font-medium">{props.seat.place}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex gap-2 font-semibold">
              <TicketIcon />
              <p>{ticket.name}</p>
            </div>
            <div className="flex gap-2 font-medium">
              <CoinsIcon />
              <p>{priceFormat.format(ticket.price)}</p>
            </div>
          </div>

          <footer className="flex flex-col">
            {isInCart ? (
              <Button disabled variant="destructive" size="sm">
                Remove from cart
              </Button>
            ) : (
              <Button disabled variant="default" size="sm">
                Add to cart
              </Button>
            )}
          </footer>
        </PopoverContent>
      </Popover>
    );
  }
);
