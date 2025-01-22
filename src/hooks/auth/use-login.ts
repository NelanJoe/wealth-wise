import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login as loginApi } from "@/services/auth.service";
import type { Login } from "@/schemas/auth.schema";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, password }: Login) =>
      await loginApi({ email, password }),
    onSuccess: (data) => {
      const user = {
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
      };

      queryClient.setQueryData(["user"], user);
      toast.success("Login sukses");
      navigate("/", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isPending };
};
