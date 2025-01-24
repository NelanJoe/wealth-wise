import { z } from "zod";

export const investmentSchema = z.object({
  amount: z.number(),
  monthlySaving: z.number(),
  annualReturn: z.number(),
  years: z.number(),
});

export const pensionFundSchema = z.object({
  monthlyExpensesLater: z.number(),
  yearsLater: z.number(),
  inflation: z.number(),
  annualReturn: z.number(),
});

export const emergencyFundSchema = z.object({
  status: z.string(),
  dependents: z.string(),
  monthlyExpenses: z.string(),
});

export type Investment = z.infer<typeof investmentSchema>;
export type PensionFund = z.infer<typeof pensionFundSchema>;
export type EmergencyFund = z.infer<typeof emergencyFundSchema>;
