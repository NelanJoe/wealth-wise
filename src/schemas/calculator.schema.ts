import { z } from "zod";

export const investmentSchema = z.object({
  currentlyAmount: z.coerce.string(),
  monthlySaving: z.coerce.string(),
  annualReturn: z.coerce.number(),
  years: z.coerce.number(),
});

export const pensionFundSchema = z.object({
  monthlyExpensesLater: z.coerce.string(),
  yearsLater: z.coerce.number(),
  inflation: z.coerce.number(),
  annualReturn: z.coerce.number(),
});

export const emergencyFundSchema = z.object({
  status: z.coerce.string(),
  dependents: z.coerce.string(),
  monthlyExpenses: z.coerce.string(),
});

export type Investment = z.infer<typeof investmentSchema>;
export type PensionFund = z.infer<typeof pensionFundSchema>;
export type EmergencyFund = z.infer<typeof emergencyFundSchema>;
