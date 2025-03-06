import { z } from "zod";
import type { User } from "./user.schema";

export const investmentSchema = z.object({
  currentlyAmount: z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
  monthlySaving: z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
  annualReturn: z.string().regex(/^\d+([.,]\d{1,2})?$/, {
    message: "Annual return harus bernilai dengan angka genap / desimal",
  }),
  years: z.string().refine((value) => {
    return Number(value) >= 0 && Number(value) <= 100;
  }, "Tahun harus bernilai antara 0 and 100"),
});

export const emergencyFundSchema = z.object({
  status: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => {
      return ["lajang", "menikah"].includes(value);
    }, "Pilih salah satu antara Lajang dan Menikah"),
  dependents: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => {
      return ["ya", "tidak"].includes(value);
    }, "Pilih salah satu antara  Ada tunjangan atau Tidak ada tunjangan"),
  monthlyExpenses: z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
});

export const pensionFundSchema = z.object({
  monthlyExpensesLater: z
    .string()
    .transform((x) => x.replace(/[^0-9.-]+/g, "")),
  yearsLater: z.string().refine((value) => {
    return Number(value) >= 0 && Number(value) <= 100;
  }, "Tahun harus bernilai antara 0 and 100"),
  inflation: z.string().regex(/^\d+([.,]\d{1,2})?$/, {
    message: "Inflation harus bernilai genap / desimal",
  }),
  annualReturn: z.string().regex(/^\d+([.,]\d{1,2})?$/, {
    message: "Annual return harus bernilai genap / desimal",
  }),
});

export type EmergencyFundType = z.infer<typeof emergencyFundSchema> & {
  uid: string;
  resultEmergencyFund: number;
  author: User;
  createdAt: string;
  updatedAt: string;
};

export type InvestmentType = z.infer<typeof investmentSchema> & {
  uid: string;
  resultInvestment: number;
  author: User;
  createdAt: string;
  updatedAt: string;
};

export type PensionFundType = z.infer<typeof pensionFundSchema> & {
  uid: string;
  resultPensionFund: number;
  author: User;
  createdAt: string;
  updatedAt: string;
};
