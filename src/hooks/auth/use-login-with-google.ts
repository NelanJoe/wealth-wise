import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginWithGoogle as loginWithGoogleApi } from "@/services/auth.service";

export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => loginWithGoogleApi(),
    onSuccess: (data) => {
      let user;

      if (data) {
        user = {
          uid: data.uid,
          displayName: data.displayName,
          email: data.email,
          photoURL: data.photoURL,
        };
      }

      queryClient.setQueryData(["user"], user);

      toast.success("Berhasil login dengan akun google");
      navigate("/", { replace: true });
    },
  });

  return {
    loginWithGoogle: mutate,
    isPending,
  };
};
