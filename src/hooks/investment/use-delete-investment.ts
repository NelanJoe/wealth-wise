import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteInvestment as deleteInvestmentApi } from "@/services/investment.service";

export const useDeleteInvestment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-invesment"],
    mutationFn: async (invesmentId: string) => {
      return await deleteInvestmentApi(invesmentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invesments"],
      });
      toast.success("Hasil perhitungan dana investasi berhasil dihapus.");
    },
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  return {
    deleteInvestment: mutate,
    isPending,
  };
};
