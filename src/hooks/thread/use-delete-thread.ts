import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteThread as deleteThreadApi } from "@/services/threads.service";

export const useDeleteThread = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (threadId: string) => {
      return deleteThreadApi(threadId);
    },
    mutationKey: ["deleteThread"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads", "categories"] });
      toast.success("Berhasil menghapus diskusi.");
      navigate("/forum", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    deleteThread: mutate,
    isPending,
  };
};
