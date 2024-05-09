import useTicketCartStore from "@/stores/TicketCartStore";
import { CartIcon } from "../icons";

export const TicketCart = () => {
  const { cartTicketsItems } = useTicketCartStore((state) => state);

  return (
    <button>
      <CartIcon />
      <div className="badge">{cartTicketsItems.length}</div>
    </button>
  );
};
