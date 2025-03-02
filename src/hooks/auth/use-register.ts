import { useNavigate } from "react-router-dom";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { register as registerApi } from "@/services/auth.service";

export const useRegister = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => {
      return await registerApi({ username, email, password });
    },
    mutationKey: ["register"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Register sukses");
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  return {
    register: mutate,
    isPending,
  };
};
