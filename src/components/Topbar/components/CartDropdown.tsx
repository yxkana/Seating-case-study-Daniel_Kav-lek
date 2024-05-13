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
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {/* Cart Icon with tciket counter */}
        <div className="indicator">
          <CartIcon />
          <span className="badge badge-sm bg-primary indicator-item shadow-md">
            {cartTicketQuantity}
          </span>
        </div>
      </div>
      {/* Dropdown for cart Icon */}
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-200 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg flex gap-2">
            {cartTicketQuantity + " Items"}
          </span>
          {/* Ticket Cart List */}
          <ul className="flex flex-col max-h-72 overflow-auto gap-2">
            {!isCartEmpty ? (
              <>
                {cartTicketsItems.map((ticket) => {
                  return (
                    <li className=" flex flex-col shadow-md shadow-base-200 gap-2 justify-between items-center bg-neutral p-2 rounded-md">
                      <h2>{ticket.eventName}</h2>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="flex gap-1 items-center font-semibold">
                            <TicketIcon width={16} />
                            {ticket.tickets.ticketType}
                          </div>
                          <div className="flex gap-1 items-center">
                            <CoinsIcon width={16} />
                            {formatPrice(ticket.tickets.price)}
                          </div>
                        </div>
                        <div
                          onClick={() => removeTicket(ticket.tickets.seatId)}
                        >
                          <TrashIcon
                            height={22}
                            className="hover:cursor-pointer hover:text-error hover:scale-110"
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </>
            ) : (
              <div className="flex justify-center h-24 flex-col items-center">
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
