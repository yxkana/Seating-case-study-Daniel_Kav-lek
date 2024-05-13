import { SubmitHandler, useForm } from "react-hook-form";
import { KeyIcon, MailIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks";
import useAuthStore from "@/stores/AuthStore";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export const LoginForm = () => {
  const login = useLogin();
  const updateUser = useAuthStore((state) => state.updateUser);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (credentials) => {
    const { email, password } = credentials;
    try {
      const response = await login.mutateAsync({ email, password });

      updateUser({
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
      });

    } catch (error) {
      setError("root", {
        message: "test error",
      });
    }
  };

  return (
    <form
      className="flex flex-col h-full justify-between gap-5"
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
      <button className="btn btn-primary" disabled={isSubmitting} type="submit">
        {"Login"}
      </button>
      {errors.root && <div className="text-error">{errors.root.message}</div>}
    </form>
  );
};
