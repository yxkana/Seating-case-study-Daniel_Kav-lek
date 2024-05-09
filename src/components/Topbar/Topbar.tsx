import { CartIcon, CoinsIcon, TicketIcon, TrashIcon } from "../icons";
import useTicketCartStore from "@/stores/TicketCartStore";
import { useFormatPrice } from "@/hooks";
import { closePopup } from "@/lib/utils";

export const Topbar = () => {
  const { cartTicketsItems, removeTicket } = useTicketCartStore(
    (state) => state
  );
  const cartTicketQuantity = cartTicketsItems.length;
  const isCartEmpty = cartTicketQuantity === 0;
  const formatPrice = useFormatPrice();

  const getCartTotal = (): string => {
    let sum: number = 0;

    for (const ticket of cartTicketsItems) {
      sum += ticket.tickets.price;
    }

    return formatPrice.format(sum);
  };

  return (
    <div className="px-10">
      <div className="navbar">
        <div className="flex-1">
          <a className="text-2xl font-semibold">Ticketer</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
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
                                  {formatPrice.format(ticket.tickets.price)}
                                </div>
                              </div>
                              <div
                                onClick={() =>
                                  removeTicket(ticket.tickets.seatId)
                                }
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
                  <span className="text-info">{getCartTotal()}</span>
                ) : null}
                <div className="card-actions">
                  <button
                    disabled={isCartEmpty}
                    onClick={() => closePopup()}
                    className="btn btn-primary btn-block"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 bg-slate-800 rounded-full"></div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="divider m-0"></div>
    </div>
  );
};
