import { CartIcon, CoinsIcon, TrashIcon, TicketIcon } from "@/components/icons";
import { TicketsPurchaseModal } from "@/components/modals";
import { useFormatPrice } from "@/hooks";
import useTicketCartStore from "@/stores/TicketCartStore";

export const CartDropdown = () => {
  const { cartTicketsItems, removeTicket, getCartTotalPrice } =
    useTicketCartStore((state) => state);
  const cartTicketQuantity = cartTicketsItems.length;
  const isCartEmpty = cartTicketQuantity === 0;
  const formatPrice = useFormatPrice().format;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        {/* Cart Icon with tciket counter */}
        <div className="indicator">
          <CartIcon />
          <span className="badge indicator-item badge-sm bg-primary shadow-md">
            {cartTicketQuantity}
          </span>
        </div>
      </div>
      {/* Dropdown for cart Icon */}
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-[1] mt-3 w-72 bg-base-200 shadow"
      >
        <div className="card-body">
          <span className="flex gap-2 text-lg font-bold">
            {cartTicketQuantity + " Items"}
          </span>
          {/* Ticket Cart List */}
          <ul className="flex max-h-72 flex-col gap-2 overflow-auto">
            {!isCartEmpty ? (
              <>
                {cartTicketsItems.map((ticket) => {
                  return (
                    <li
                      key={ticket.tickets.seatId}
                      className=" flex flex-col items-center justify-between gap-2 rounded-md bg-neutral p-2 shadow-md shadow-base-200"
                    >
                      <h2>{ticket.eventName}</h2>
                      <div className="flex w-full items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1 font-semibold">
                            <TicketIcon width={16} />
                            {ticket.tickets.ticketType}
                          </div>
                          <div className="flex items-center gap-1">
                            <CoinsIcon width={16} />
                            {formatPrice(ticket.tickets.price)}
                          </div>
                        </div>
                        <div
                          onClick={() => removeTicket(ticket.tickets.seatId)}
                        >
                          <TrashIcon
                            height={22}
                            className="hover:scale-110 hover:cursor-pointer hover:text-error"
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </>
            ) : (
              <div className="flex h-24 flex-col items-center justify-center">
                <h1>{"Empty Cart!"}</h1>
              </div>
            )}
          </ul>
          {!isCartEmpty ? (
            /* Total price of Cart */
            <span className="text-info">
              {formatPrice(getCartTotalPrice())}
            </span>
          ) : null}
          {/* Checkout button */}
          <div className="card-actions">
            <TicketsPurchaseModal isButtonAcitve={isCartEmpty} />
          </div>
        </div>
      </div>
    </div>
  );
};
