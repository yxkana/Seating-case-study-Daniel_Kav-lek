import { SubmitHandler, useForm } from "react-hook-form";
import { KeyIcon, MailIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartOrderLoginProps } from "./WithoutLoginTicketPurchaseForm";
import { PostCartTicketData, useLogin, usePostCartOrder } from "@/hooks";
import useAuthStore from "@/stores/AuthStore";
import useTicketCartStore from "@/stores/TicketCartStore";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export const LoginTicketPurchaseForm = ({
  setResultData,
}: CartOrderLoginProps) => {
  const login = useLogin();
  const updateUser = useAuthStore((state) => state.updateUser);
  const { clearCart, cartTicketsItems } = useTicketCartStore((state) => state);
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
      /*User login */
      const result = await login.mutateAsync({
        email: credentials.email,
        password: credentials.password,
      });
      updateUser({
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
      });

      const tickets: PostCartTicketData[] = cartTicketsItems.map((ticket) => {
        return {
          seatId: ticket.tickets.seatId,
          ticketTypeId: ticket.tickets.ticketTypeId,
        };
      });

      /* Cart order mutation */
      const orderResult = await postOrder.mutateAsync({
        eventId: cartTicketsItems[0].eventId,
        user: {
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
        },
        tickets: tickets,
      });
      /* Setting response message to state */
      setResultData(orderResult);
      /* Clearing Cart */
      clearCart();
    } catch (error) {
      setError("root", {
        message: "test error",
      });
    }
  };

  return (
    <form
      className="flex h-full flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
        <label className="input input-bordered flex items-center gap-2">
          <MailIcon />
          <input
            className="text-sm"
            {...register("email")}
            type="text"
            placeholder="Email"
          />
        </label>
        {errors.email && (
          <div className="text-error">{errors.email.message}</div>
        )}
        <label className="input input-bordered flex items-center gap-2">
          <KeyIcon />
          <input
            className="text-sm"
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </label>
        {errors.password && (
          <div className="text-error">{errors.password.message}</div>
        )}
      </div>
      <button
        className="btn btn-primary mt-5"
        disabled={isSubmitting}
        type="submit"
      >
        {"Login"}
      </button>
      {errors.root && <div className="text-error">{errors.root.message}</div>}
    </form>
  );
};
