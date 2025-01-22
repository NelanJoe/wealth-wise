import { useQueries } from "@tanstack/react-query";
import { getCategories } from "@/services/categories.service";
import { getThreads } from "@/services/threads.service";

export const useSharedThreadsCategories = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["threads"],
        queryFn: async () => await getThreads(),
      },
      {
        queryKey: ["threads", "categories"],
        queryFn: async () => await getCategories(),
      },
    ],
    combine: (results) => {
      const [{ data: threads }, { data: categories }] = results;

      return {
        threads,
        categories,
        pending: results.some((result) => result.isPending),
        isError: results.some((result) => result.isError),
        error: results.some((result) => result.error?.message),
      };
    },
  });
};
