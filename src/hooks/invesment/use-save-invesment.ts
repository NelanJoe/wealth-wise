import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { saveInvestment as saveInvestmentApi } from "@/services/investment.service";

export const useSaveInvestment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["save-invesment"],
    mutationFn: async ({
      currentlyAmount,
      monthlySaving,
      annualReturn,
      years,
      resultInvestment,
    }: {
      currentlyAmount: string;
      monthlySaving: string;
      annualReturn: string;
      years: number;
      resultInvestment: number;
    }) => {
      return await saveInvestmentApi({
        currentlyAmount,
        monthlySaving,
        annualReturn,
        years,
        resultInvestment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invesments"] });
      toast.success("Hasil perhitungan dana investasi berhasil disimpan.");
    },
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  return {
    saveInvestment: mutate,
    isPending,
  };
};
