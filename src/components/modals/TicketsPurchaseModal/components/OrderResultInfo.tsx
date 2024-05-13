import { PostCartOrderResponseData, useFormatPrice } from "@/hooks";
import { DialogTrigger } from "@radix-ui/react-dialog";
interface OrderResultInfo {
  data: PostCartOrderResponseData | null;
}

export const OrderResultInfo = (data: OrderResultInfo) => {
  const formatPrice = useFormatPrice().format;

  if (!data.data) {
    return null;
  }

  /* Result is mainly for success. Not enough information for more states */

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <h1 className="text-2xl">{data.data.message}</h1>
      <div className="flex flex-col items-start gap-2">
        <span>{"Email: " + data.data.user.email}</span>
        <span>{"Order number: " + data.data.orderId}</span>
        <span>{"Order price: " + formatPrice(data.data.totalAmount)}</span>
      </div>
      <DialogTrigger className="btn btn-primary btn-block">
        {"Return"}
      </DialogTrigger>
    </div>
  );
};
