import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { motion } from "framer-motion";

import { useCurrentUser, useSaveInvestment } from "@/hooks";
import { formatCurrency } from "@/libs/format-currency";

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

    // Rumus anuitas jatuh tempo: FV = PMT * ((1 + i)^n - 1) / i * (1 + i)
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
            <FormField
              name="currentlyAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="currentlyAmount">
                    Uang yang Anda miliki saat ini?{" "}
                    <span className="text-primary">(Investasi Awal - PV)</span>
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
                    Jumlah yang dapat Anda tabung setiap bulan?{" "}
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
                    Suku bunga tahunan dari investasi Anda?{" "}
                    <span className="text-primary">(r)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        id="annualReturn"
                        type="string"
                        placeholder="Contoh: 5,9"
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
                    Durasi investasi Anda?{" "}
                    <span className="text-primary">(t)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        id="years"
                        type="string"
                        placeholder="Contoh: 2"
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
            {/* InvestmentValue */}
            {investmentValue ? (
              <motion.div
                key="investmentValue"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="border p-3 rounded-xl w-[75%] md:w-[70%] text-sm"
              >
                <p>
                  Perkiraan jumlah investasi Anda pada setelah{" "}
                  <span className="text-primary">
                    {form.getValues("years") ? form.getValues("years") : 0}{" "}
                    tahun
                  </span>{" "}
                  lagi sebesar{" "}
                  <span className="underline text-primary underline-offset-8 decoration-primary">
                    {formatCurrency(investmentValue)}
                  </span>
                </p>
              </motion.div>
            ) : null}
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
