import { useQuery } from "@tanstack/react-query";
import { getInvestments } from "@/services/investment.service";

export const useGetInvesments = () => {
  return useQuery({
    queryKey: ["invesments"],
    queryFn: async () => await getInvestments(),
  });
};
