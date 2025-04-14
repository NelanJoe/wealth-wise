import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SaveIcon } from "lucide-react";

import { useCurrentUser, useSavePensionFund } from "@/hooks";

import { pensionFundSchema } from "@/schemas/calculator.schema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import PensionFundInformation from "./pension-fund-information";
import PensionFundInputField from "./pension-fund-input-field";
import PensionFundResult from "./pension-fund-result";

export default function PensionFundForm() {
  const form = useForm<z.infer<typeof pensionFundSchema>>({
    resolver: zodResolver(pensionFundSchema),
    defaultValues: {
      monthlyExpensesLater: "",
      yearsLater: "",
      inflation: "",
      annualReturn: "",
    },
  });

  const [pensionFundValue, setPensionFundValue] = useState<number>(0);

  const { data: currentUser } = useCurrentUser();
  const { savePensionFund, isPending } = useSavePensionFund();

  const onSubmit: SubmitHandler<z.infer<typeof pensionFundSchema>> = ({
    monthlyExpensesLater,
    yearsLater,
    inflation,
    annualReturn,
  }) => {
    const MELValue = Number(monthlyExpensesLater.replace(/[^0-9]/g, ""));
    const tValue = Number(yearsLater.replace(/[^0-9]/g, ""));
    const iValue = parseFloat(inflation) / 100;
    const rValue = parseFloat(annualReturn) / 100;

    // 1. Future value dari pengeluaran bulanan (M)
    const MValue = MELValue * Math.pow(1 + iValue, tValue);

    // 2. Pengeluaran tahunan (Y)
    const YValue = MValue * 12;

    // 3. Dana pensiun berdasarkan aturan 4%
    let totalPensionFundValue;
    if (rValue > iValue) {
      totalPensionFundValue = (100 / (rValue - iValue)) * YValue;
    } else {
      totalPensionFundValue = 25 * YValue;
    }

    setPensionFundValue(Number(totalPensionFundValue.toFixed(2)));
  };

  const onSavePensionFund = () => {
    const monthlyExpensesLater = form.getValues("monthlyExpensesLater");
    const yearsLater = Number(form.getValues("yearsLater").replace(/\D/g, ""));
    const inflation = form.getValues("inflation");
    const annualReturn = form.getValues("annualReturn");

    savePensionFund(
      {
        monthlyExpensesLater,
        yearsLater,
        inflation,
        annualReturn,
        resultPensionFund: pensionFundValue,
      },
      {
        onSettled: () => {
          setPensionFundValue(0);
          form.reset();
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <div>
            <CardTitle>Dana Pensiun</CardTitle>
            <CardDescription>
              Rencanakan Dana Pensiun untuk Masa Tua Anda
            </CardDescription>
          </div>
          <PensionFundInformation />
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <PensionFundInputField
              name="monthlyExpensesLater"
              label="Rencana pengeluaran bulanan saat Anda pensiun nanti?"
              hint="MEL"
              placeholder="Contoh: Rp. 10.000.000"
              control={form.control}
              type="currency"
            />
            <PensionFundInputField
              name="yearsLater"
              label="Berapa tahun lagi Anda akan pensiun?"
              hint="t"
              placeholder="20"
              suffix="tahun"
              control={form.control}
              type="currency"
            />
            <PensionFundInputField
              name="inflation"
              label="Asumsi Inflasi di Indonesia (Rerata inflasi 10 tahun terakhir yaitu 3,58%/tahun) "
              hint="i"
              placeholder="3,58"
              suffix="% / tahun"
              control={form.control}
              type="currency"
            />
            <PensionFundInputField
              name="annualReturn"
              label="Estimasi return tahunan dari investasi Anda (misal: 6% untuk reksa dana saham / 4% untuk deposito)"
              hint="r"
              placeholder="5"
              suffix="% / tahun"
              control={form.control}
              type="currency"
            />
            <PensionFundResult value={pensionFundValue} />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col w-full gap-4 md:flex-row md:w-fit">
              <Button type="submit" className="w-full">
                Hitung
              </Button>
              {currentUser && (
                <Button
                  type="button"
                  className="w-full"
                  variant="outline"
                  disabled={!pensionFundValue || isPending}
                  onClick={onSavePensionFund}
                >
                  <div className="flex items-center gap-2">
                    {isPending ? (
                      <Loader2Icon className="w-4 h-4 animate-spin" />
                    ) : (
                      <SaveIcon className="w-4 h-4" />
                    )}{" "}
                    Simpan hasil perhitungan
                  </div>
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
