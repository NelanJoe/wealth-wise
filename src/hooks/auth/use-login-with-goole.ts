import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginWithGoogle as loginWithGoogleApi } from "@/services/auth.service";

export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => loginWithGoogleApi(),
    onSuccess: () => {
      toast.success("Berhasil login dengan akun google");
      navigate("/", { replace: true });
    },
  });

  return {
    loginWithGoogle: mutate,
    isPending,
  };
};
