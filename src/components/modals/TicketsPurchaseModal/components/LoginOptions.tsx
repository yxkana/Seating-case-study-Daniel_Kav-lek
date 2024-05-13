import { useState } from "react";
import {
  LoginTicketPurchaseForm,
  WithoutLoginTicketPurchaseForm,
} from "../forms";
import { OrderResultInfo } from "./OrderResultInfo";
import {
  PostCartOrderResponseData,
  PostCartTicketData,
  usePostCartOrder,
} from "@/hooks";
import useAuthStore from "@/stores/AuthStore";
import useTicketCartStore from "@/stores/TicketCartStore";

export const LoginOptions = () => {
  const user = useAuthStore((state) => state.user);
  const { cartTicketsItems, clearCart } = useTicketCartStore((state) => state);
  const postOrder = usePostCartOrder();
  const [successOrderData, setSuccessOrderData] =
    useState<PostCartOrderResponseData | null>(null);

  const reserveTickets = async () => {
    if (!user) {
      return;
    }
    const tickets: PostCartTicketData[] = cartTicketsItems.map((ticket) => {
      return {
        seatId: ticket.tickets.seatId,
        ticketTypeId: ticket.tickets.ticketTypeId,
      };
    });

    const result = await postOrder.mutateAsync({
      eventId: cartTicketsItems[0].eventId,
      user: {
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
      tickets: tickets,
    });

    setSuccessOrderData(result);
    clearCart();
  };

  return (
    <>
      <>
        {successOrderData === null ? (
          <>
            {user ? (
              <div className="flex flex-col items-center h-full justify-between">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl">{`Login as ${user.firstName} ${user.lastName}`}</h1>
                  <span>{`Email: ${user.email}`}</span>
                </div>
                <button
                  onClick={() => reserveTickets()}
                  className="btn btn-primary ml-auto"
                >
                  {"Reserve tickets"}
                </button>
              </div>
            ) : (
              <div className="flex w-full justify-evenly">
                <div className="flex flex-col gap-10">
                  <h1 className="text-2xl">Without Login</h1>
                  <WithoutLoginTicketPurchaseForm
                    setResultData={setSuccessOrderData}
                  />
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-col gap-10">
                  <h1 className="text-2xl">Login</h1>
                  <LoginTicketPurchaseForm
                    setResultData={setSuccessOrderData}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <OrderResultInfo data={successOrderData} />
          </>
        )}
      </>
    </>
  );
};
