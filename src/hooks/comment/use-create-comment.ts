import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createComment as createCommentApi } from "@/services/comments.service";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      threadId,
      text,
    }: {
      threadId: string;
      text: string;
    }) => await createCommentApi({ threadId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads", "comments"] });
      toast.success("Komentar berhasil ditambahkan.");
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    createComment: mutate,
    isPending,
  };
};
