import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SaveIcon } from "lucide-react";

import { useCurrentUser, useSaveInvestment } from "@/hooks";

import { investmentSchema } from "@/schemas/calculator.schema";

import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Form } from "../ui/form";
import InvestmentInformation from "./investment-information";
import InvestmentInputField from "./investment-input-field";
import InvestmentResult from "./investment-result";

export default function InvesmentForm() {
  const form = useForm<z.infer<typeof investmentSchema>>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      currentlyAmount: "",
      monthlySaving: "",
      annualReturn: "",
      years: "",
    },
  });

  const [investmentValue, setInvestmentValue] = useState<number>(0);

  const { data: currentUser } = useCurrentUser();
  const { saveInvestment, isPending } = useSaveInvestment();

  const onSubmit: SubmitHandler<z.infer<typeof investmentSchema>> = ({
    currentlyAmount,
    monthlySaving,
    annualReturn,
    years,
  }) => {
    // Ambil dan konversi nilai input
    const PValue = Number(currentlyAmount.replace(/\D/g, ""));
    const PMTValue = Number(monthlySaving.replace(/\D/g, ""));
    const annualRate = parseFloat(annualReturn) / 100; // cth: 2 / 100 = 0.02
    const periods = Number(years.replace(/\D/g, "")) * 12; // ubah tahun ke bulan
    const monthlyRate = annualRate / 12;

    // Rumus lump sum: FV = PV * (1 + i)^n
    const FV_awal = PValue * Math.pow(1 + monthlyRate, periods);

    // Rumus anuitas jatuh tempo: FV = PMT * ((1 + r)^n - 1) / r * (1 + r)
    const FV_anuitas =
      PMTValue *
      ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const futureValue = FV_awal + FV_anuitas;

    // Validasi dan set hasil
    if (isNaN(futureValue)) {
      setInvestmentValue(0);
      return;
    }

    setInvestmentValue(Number(futureValue.toFixed(2)));
  };

  const onSaveInvestment = () => {
    saveInvestment(
      {
        currentlyAmount: form.getValues("currentlyAmount"),
        monthlySaving: form.getValues("monthlySaving"),
        annualReturn: form.getValues("annualReturn"),
        years: form.getValues("years"),
        resultInvestment: investmentValue,
      },
      {
        onSettled: () => {
          setInvestmentValue(0);
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
            <CardTitle>Investasi</CardTitle>
            <CardDescription>
              Hitung Aset Masa Depan Anda dengan Nilai Investasi yang Anda Telah
              Terapkan
            </CardDescription>
          </div>
          <InvestmentInformation />
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <InvestmentInputField
              name="currentlyAmount"
              label="Uang yang Anda miliki saat ini?"
              hint="Investasi Awal - PV"
              placeholder="Contoh: Rp. 5.000.000"
              control={form.control}
              type="currency"
            />
            <InvestmentInputField
              name="monthlySaving"
              label="Jumlah yang dapat Anda tabung setiap bulan?"
              hint="PMT"
              placeholder="Contoh: Rp. 1.000.000"
              control={form.control}
              type="currency"
            />
            <InvestmentInputField
              name="annualReturn"
              label="Suku bunga tahunan dari investasi Anda?"
              hint="r"
              placeholder="Contoh: 5,9"
              control={form.control}
              suffix={<span className="text-sm">% / tahun</span>}
              type="currency"
            />
            <InvestmentInputField
              name="years"
              label="Durasi investasi Anda?"
              hint="t"
              placeholder="Contoh: 2"
              control={form.control}
              suffix={<span className="text-sm">tahun</span>}
              type="currency"
            />
            {/* InvestmentValue */}
            <InvestmentResult
              value={investmentValue}
              years={form.getValues("years")}
            />
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
                  disabled={!investmentValue || isPending}
                  onClick={onSaveInvestment}
                >
                  <div className="flex items-center gap-2">
                    {isPending ? (
                      <Loader2Icon className="animate-spin" />
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
