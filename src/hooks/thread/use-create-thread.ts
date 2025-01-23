import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createThread as createThreadApi } from "@/services/threads.service";
import type { Thread } from "@/schemas/thread.schema";

export const useCreateThread = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createThread"],
    mutationFn: async ({
      title,
      body,
      category,
    }: Pick<Thread, "title" | "body" | "category">) => {
      return await createThreadApi({ title, body, category });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads", "categories"] });
      toast.success("Thread berhasil ditambahkan.");
      navigate("/forum", { replace: true });
    },
    onError: () => toast.error("Thread gagal ditambahkan."),
  });

  return {
    createThread: mutate,
    isPending,
  };
};
