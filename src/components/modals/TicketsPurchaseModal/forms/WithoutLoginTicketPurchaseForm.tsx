import { SubmitHandler, useForm } from "react-hook-form";
import { MailIcon, User2Icon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTicketCartStore from "@/stores/TicketCartStore";
import {
  PostCartOrderResponseData,
  PostCartTicketData,
  usePostCartOrder,
} from "@/hooks";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

type FormFields = z.infer<typeof schema>;

export interface CartOrderLoginProps {
  setResultData: React.Dispatch<
    React.SetStateAction<PostCartOrderResponseData | null>
  >;
}

export const WithoutLoginTicketPurchaseForm = ({
  setResultData,
}: CartOrderLoginProps) => {
  const { cartTicketsItems, clearCart } = useTicketCartStore((state) => state);
  const postOrder = usePostCartOrder();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (credentials) => {
    try {
      const tickets: PostCartTicketData[] = cartTicketsItems.map((ticket) => {
        return {
          seatId: ticket.tickets.seatId,
          ticketTypeId: ticket.tickets.ticketTypeId,
        };
      });

      const result = await postOrder.mutateAsync({
        eventId: cartTicketsItems[0].eventId,
        user: {
          email: credentials.email,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
        },
        tickets: tickets,
      });

      setResultData(result);
      clearCart();
    } catch (error) {
      setError("root", {
        message: "Text error",
      });
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <label className="input input-bordered flex items-center gap-2">
        <MailIcon />
        <input
          className="text-sm"
          {...register("email")}
          type="text"
          placeholder="Email"
          required
        />
      </label>
      {errors.email && <div className="text-error">{errors.email.message}</div>}
      <label className="input input-bordered flex items-center gap-2">
        <User2Icon />
        <input
          className="text-sm"
          {...register("firstName")}
          type="text"
          placeholder="First Name"
          required
        />
      </label>
      {errors.firstName && (
        <div className="text-error">{errors.firstName.message}</div>
      )}
      <label className="input input-bordered flex items-center gap-2">
        <User2Icon />
        <input
          className="text-sm"
          {...register("lastName")}
          type="text"
          placeholder="Last Name"
          required
        />
      </label>
      {errors.lastName && (
        <div className="text-error">{errors.lastName.message}</div>
      )}
      <button className="btn btn-primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Continue"}
      </button>
      {errors.root && <div className="text-error">{errors.root.message}</div>}
    </form>
  );
};
