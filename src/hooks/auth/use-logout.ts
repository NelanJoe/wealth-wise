import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "@/services/auth.service";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
