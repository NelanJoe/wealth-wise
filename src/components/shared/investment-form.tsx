import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SaveIcon } from "lucide-react";

import { useSaveInvestment } from "@/hooks";
import { formatCurrency } from "@/lib/format-currency";

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
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import InvestmentInformation from "./investment-information";

export default function InvesmentForm() {
  const form = useForm<z.infer<typeof investmentSchema>>({
    resolver: zodResolver(investmentSchema),
  });

  const [investmentValue, setInvestmentValue] = useState<number>(0);

  const { saveInvestment, isPending } = useSaveInvestment();

  const onSubmit: SubmitHandler<z.infer<typeof investmentSchema>> = ({
    currentlyAmount,
    monthlySaving,
    annualReturn,
    years,
  }) => {
    /**
     * Rumus Future Value dari Aset Awal
     * A = PV * (1 + r/12)^12t //
     * B = PMT * ((1 + r/12)^12t - 1) / r/12
     * Total = A + B // Aset Masa Depan
     *
     * Ket:
     * PV: Future Value (Aset Awal)
     * PMT: Jumlah Pengeluaran Bulanan
     * r: Annual Return / Tingkat bunga per-tahun
     * t: Jangka waktu investasi per-tahun
     * */
    const PValue = Number(currentlyAmount.replace(/\D/g, ""));
    const PMTValue = Number(monthlySaving.replace(/\D/g, ""));
    const rValue = annualReturn / 12 / 100; // 1 tahun = 12 / 100 = 0.012
    const nValue = years * 12; // input years * 12

    const A = PValue * Math.pow(1 + rValue, nValue);
    const B = (PMTValue * (Math.pow(1 + rValue, nValue) - 1)) / rValue;
    const totalInvestmentValue = A + B;

    if (isNaN(totalInvestmentValue)) {
      setInvestmentValue(0);
      return;
    }

    setInvestmentValue(Number(totalInvestmentValue.toFixed(2)));
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
            <FormField
              name="currentlyAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="currentlyAmount">
                    Uang yang anda miliki saat ini sebesar?{" "}
                    <span className="text-primary">(P)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="currentlyAmount"
                      type="currency"
                      placeholder="Contoh: Rp. 5.000.000"
                      className="w-[75%] md:w-[70%]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="monthlySaving"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="monthlySaving">
                    Uang yang dapat Anda tabung per bulan?{" "}
                    <span className="text-primary">(PMT)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="monthlySaving"
                      type="currency"
                      placeholder="Contoh: Rp. 1.000.000"
                      className="w-[75%] md:w-[70%]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="annualReturn"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="annualReturn">
                    Anda akan investasi di produk yang returnnya?{" "}
                    <span className="text-primary">(r)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        id="annualReturn"
                        type="number"
                        placeholder="5,9"
                        {...field}
                        className="w-[75%] md:w-[70%]"
                      />
                      <span className="text-sm">% / tahun</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="years"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="years">
                    Berapa lama Anda konsisten menabung dan berinvestasi?{" "}
                    <span className="text-primary">(t)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        id="years"
                        type="number"
                        placeholder="2"
                        {...field}
                        className="w-[75%] md:w-[70%]"
                      />
                      <span className="text-sm">tahun</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {investmentValue ? (
              <div className="border p-3 rounded-xl">
                <p>
                  Uang yang akan Anda miliki pada{" "}
                  <span className="text-primary">
                    {form.getValues("years") ? form.getValues("years") : 0}{" "}
                    tahun
                  </span>{" "}
                  lagi sebesar{" "}
                  <span className="underline underline-offset-4 decoration-primary">
                    {formatCurrency(investmentValue)}
                  </span>
                </p>
              </div>
            ) : null}
          </CardContent>
          <CardFooter>
            <div className="flex flex-col w-full gap-4 md:flex-row md:w-fit">
              <Button type="submit" className="w-full">
                Hitung
              </Button>
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
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
