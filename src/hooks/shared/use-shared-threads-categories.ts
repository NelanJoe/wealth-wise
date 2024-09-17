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
        queryKey: ["categories"],
        queryFn: async () => await getCategories(),
      },
    ],
  });
};
