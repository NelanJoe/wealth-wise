import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { savePensionFund as savePensionFundApi } from "@/services/pension-fund.service";

export const useSavePensionFund = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["save-pension-fund"],
    mutationFn: async ({
      monthlyExpensesLater,
      yearsLater,
      inflation,
      annualReturn,
      resultPensionFund,
    }: {
      monthlyExpensesLater: string;
      yearsLater: number;
      inflation: string;
      annualReturn: string;
      resultPensionFund: number;
    }) => {
      return savePensionFundApi({
        monthlyExpensesLater,
        yearsLater,
        inflation,
        annualReturn,
        resultPensionFund,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pension-fund"] });
      toast.success("Hasil perhitungan dana pensiun berhasil disimpan.");
    },
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  return {
    savePensionFund: mutate,
    isPending,
  };
};
