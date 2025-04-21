import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { savePensionFund as savePensionFundApi } from "@/services/pension-fund.service";
import { PensionFundType } from "@/schemas/calculator.schema";

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
    }: Omit<PensionFundType, "uid" | "author" | "createdAt" | "updatedAt">) => {
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
