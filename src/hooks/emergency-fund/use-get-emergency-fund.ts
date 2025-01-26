import { getEmergencyFund } from "@/services/emergency-fund.service";
import { useQuery } from "@tanstack/react-query";

export const useGetEmergencyFund = () => {
  return useQuery({
    queryKey: ["emergency-fund"],
    queryFn: async () => await getEmergencyFund(),
  });
};
