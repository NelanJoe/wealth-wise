import { useQuery } from "@tanstack/react-query";
import { getPensionFund } from "@/services/pension-fund.service";

export const useGetPensionFund = () => {
  return useQuery({
    queryKey: ["pension-fund"],
    queryFn: async () => await getPensionFund(),
  });
};
