import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginWithGoogle as loginWithGoogleApi } from "@/services/auth.service";

export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => loginWithGoogleApi(),
    onSuccess: ({ uid, displayName, email, photoURL }) => {
      queryClient.setQueryData(["user"], { uid, displayName, email, photoURL });
      toast.success("Berhasil login dengan akun google");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    loginWithGoogle: mutate,
    isPending,
  };
};
