import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deletePensionFund as deletePensionFundApi } from "@/services/pension-fund.service";

export const useDeltePensionFund = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-pension-fund"],
    mutationFn: async (pensionFundId: string) => {
      await deletePensionFundApi(pensionFundId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pension-fund"] });
      toast.success("Hasil perhitungan dana pensiun berhasil dihapus.");
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  return {
    deletePensionFund: mutate,
    isPending,
  };
};
