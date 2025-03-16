import { useQueries } from "@tanstack/react-query";
import { getComments } from "@/services/comments.service";
import { getThread } from "@/services/threads.service";

export const useSharedThreadComments = (threadId: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ["threads", { threadId }],
        queryFn: async () => await getThread(threadId),
        retry: false,
      },
      {
        queryKey: ["threads", "comments", { threadId }],
        queryFn: async () => await getComments(threadId),
        enabled: !!threadId,
        retry: false,
      },
    ],
    combine: (results) => {
      const [{ data: thread }, { data: comments }] = results;

      return {
        thread,
        comments,
        pending: results.some((result) => result.isPending),
        isError: results.some((result) => result.isError),
        error: results.some((result) => result.error?.message),
      };
    },
  });
};
