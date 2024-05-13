import { eventData, seatsData, useIsMobile } from "@/hooks";
import { Seat } from "./Seat";
import classnames from "classnames";

interface SeatingCardProps {
  event: eventData;
  seats: seatsData;
}

interface TicketTypeInfoProps {
  type?: "Regular ticket" | "VIP ticket";
}

export const SeatingCard = ({ seats, event }: SeatingCardProps) => {
  const isMobile = useIsMobile();

  const TicketLegend = ({ type }: TicketTypeInfoProps) => {
    return (
      <div className="flex gap-2 items-center">
        <div
          className={classnames(
            "size-2 rounded-full",
            {
              "bg-vipTicket-100": type === "VIP ticket",
            },
            { "bg-regularTicket-100": type === "Regular ticket" }
          )}
        ></div>
        <div className="text-sm">{type}</div>
      </div>
    );
  };

  /* Reverse rows for better experience when viewing seats */
  const reverseRows = [...seats.seatRows].reverse();

  return (
    <div>
      {reverseRows.map((row) => {
        /* Line up seats after each other */
        const consecutiveSeatOrder = row.seats.map((seatRow, index) => {
          return {
            ...seatRow,
            place: index + 1,
          };
        });

        return (
          <div
            key={row.seatRow}
            className="flex gap-5 justify-between items-center"
          >
            <p>{row.seatRow}</p>
            <div className="flex gap-2">
              {consecutiveSeatOrder.map((seat) => {
                /* Seat Row */
                return (
                  <Seat
                    key={seat.seatId}
                    ticketType={seats.ticketTypes}
                    seat={seat}
                    rowNumber={row.seatRow}
                    event={event}
                  />
                );
              })}
            </div>
            <p>{row.seatRow}</p>
          </div>
        );
      })}

      <div className="divider mt-12 text-xl">{"Screen"}</div>
      <div className="flex gap-2 py-2">
        {seats.ticketTypes.map((type) => {
          return <TicketLegend key={type.id} type={type.name} />;
        })}
        <div className="flex items-center gap-2 text-sm">
          <div className="size-2 rounded-full bg-info"></div>
          {"In Cart"}
        </div>
      </div>
    </div>
  );
};
