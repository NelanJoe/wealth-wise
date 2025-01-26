import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { saveEmergencyFund as saveEmergencyFundApi } from "@/services/emergency-fund.service";

export const useSaveEmergencyFund = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["saveEmergencyFund"],
    mutationFn: async ({
      status,
      dependents,
      monthlyExpenses,
      resultEmergencyFund,
    }: {
      status: string;
      dependents: string;
      monthlyExpenses: string;
      resultEmergencyFund: number;
    }) => {
      return await saveEmergencyFundApi({
        status,
        dependents,
        monthlyExpenses,
        resultEmergencyFund,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emergency-fund"] });
      toast.success("Hasil perhitungan dana darurat berhasil disimpan.");
    },
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  return {
    saveEmergencyFund: mutate,
    isPending,
  };
};
