import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteEmergencyFund as deleteEmergencyFundApi } from "@/services/emergency-fund.service";

export const useDeleteEmergencyFund = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-emergency-fund"],
    mutationFn: async (emergencyFundId: string) => {
      return await deleteEmergencyFundApi(emergencyFundId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emergency-fund"] });
      toast.success("Hasil perhitungan dana darurat berhasil dihapus.");
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  return {
    deleteEmergencyFund: mutate,
    isPending,
  };
};
