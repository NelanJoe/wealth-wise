import { z } from "zod";
import type { User } from "./user.schema";

export const investmentSchema = z.object({
  currentlyAmount: z.coerce.string(),
  monthlySaving: z.coerce.string(),
  annualReturn: z.coerce.string(),
  years: z.coerce.number(),
});

export const emergencyFundSchema = z.object({
  status: z.coerce.string(),
  dependents: z.coerce.string(),
  monthlyExpenses: z.coerce.string(),
});

export const pensionFundSchema = z.object({
  monthlyExpensesLater: z.coerce.string(),
  yearsLater: z.coerce.number(),
  inflation: z.coerce.string(),
  annualReturn: z.coerce.string(),
});

export type EmergencyFundType = z.infer<typeof emergencyFundSchema> & {
  resultEmergencyFund: number;
  createdAt: string;
  uid: string;
  author: User;
};

export type InvestmentType = z.infer<typeof investmentSchema> & {
  resultInvestment: number;
  createdAt: string;
  uid: string;
  author: User;
};

export type PensionFundType = z.infer<typeof pensionFundSchema> & {
  resultPensionFund: number;
  createdAt: string;
  uid: string;
  author: User;
};
