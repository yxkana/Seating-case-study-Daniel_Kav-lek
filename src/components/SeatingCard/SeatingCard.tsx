import { seatsData } from "@/hooks";
import { Seat } from "./Seat";
import classnames from "classnames";

interface SeatingCardProps {
  seats: seatsData;
}

interface TicketTypeInfoProps {
  type: "Regular ticket" | "VIP ticket";
}

export const SeatingCard = ({ seats }: SeatingCardProps) => {
  const TicketType = ({ type }: TicketTypeInfoProps) => {
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
        <div>{type}</div>
      </div>
    );
  };

  return (
    <div>
      {seats.seatRows.map((row) => {
        return (
          <div key={row.seatRow} className="flex gap-2">
            {row.seats.map((seat) => {
              return (
                <Seat
                  key={seat.seatId}
                  ticketType={seats.ticketTypes}
                  seat={seat}
                />
              );
            })}
          </div>
        );
      })}
      <div className="flex gap-2">
        {seats.ticketTypes.map((type) => {
          return <TicketType type={type.name} />;
        })}
      </div>
    </div>
  );
};
