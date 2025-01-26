import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { investmentSchema } from "@/schemas/calculator.schema";
import { formatCurrency } from "@/lib/format-currency";

import InvesmentInformation from "./invesment-information";

export default function InvesmentForm() {
  const form = useForm<z.infer<typeof investmentSchema>>({
    resolver: zodResolver(investmentSchema),
  });

  const [invesmentValue, setInvesmentValue] = useState<number>(0);

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
     * PV: Present Value (Aset Awal)
     * PMT: Jumlah Pengeluaran Bulanan
     * r: Annual Return / Tingkat bunga per-tahun
     * t: Jangka waktu investasi per-tahun
     * */
    const presentValue = Number(currentlyAmount.replace(/\D/g, ""));
    const PMTValue = Number(monthlySaving.replace(/\D/g, ""));
    const rValue = annualReturn / 12 / 100; // 1 tahun = 12 / 100% = 12%
    const nValue = years * 12; // input years * 12

    const A = presentValue * Math.pow(1 + rValue, nValue);
    const B = (PMTValue * (Math.pow(1 + rValue, nValue) - 1)) / rValue;
    const totalInvestmentValue = A + B;

    if (isNaN(totalInvestmentValue)) {
      setInvesmentValue(0);
      return;
    }

    setInvesmentValue(Number(totalInvestmentValue.toFixed(2)));
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
          <InvesmentInformation />
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
                  <FormLabel>
                    Uang yang anda miliki saat ini sebesar?{" "}
                    <span className="text-primary">(PV)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="currency"
                      placeholder="Contoh: Rp. 5.000.000"
                      className="w-[70%] md:w-[60%]"
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
                  <FormLabel>
                    Uang yang dapat Anda tabung per bulan?{" "}
                    <span className="text-primary">(PMT)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="currency"
                      placeholder="Contoh: Rp. 1.000.000"
                      className="w-[70%] md:w-[60%]"
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
                  <FormLabel>
                    Anda akan investasi di produk yang returnnya?{" "}
                    <span className="text-primary">(r)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder="5,9"
                        {...field}
                        className="w-[70%] md:w-[60%]"
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
                  <FormLabel>
                    Berapa lama Anda konsisten menabung dan berinvestasi?{" "}
                    <span className="text-primary">(t)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder="2"
                        {...field}
                        className="w-[70%] md:w-[60%]"
                      />
                      <span className="text-sm">tahun</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {invesmentValue ? (
              <div>
                <p>
                  Uang yang akan Anda miliki pada{" "}
                  {form.getValues("years") ? form.getValues("years") : 0} tahun
                  lagi sebesar {formatCurrency(invesmentValue)}
                </p>
              </div>
            ) : null}
          </CardContent>
          <CardFooter>
            <div className="flex flex-col w-full gap-4 md:flex-row md:w-fit">
              <Button type="submit" className="w-full">
                Hitung
              </Button>
              <Button type="button" className="w-full">
                Simpan hasil perhitungan
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
