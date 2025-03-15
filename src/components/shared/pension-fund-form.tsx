import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SaveIcon } from "lucide-react";

import { useCurrentUser, useSavePensionFund } from "@/hooks";

import { pensionFundSchema } from "@/schemas/calculator.schema";
import { formatCurrency } from "@/libs/format-currency";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import PensionFundInformation from "./pension-fund-information";

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

    // Calculate future value of monthly expenses
    const MValue = MELValue * Math.pow(1 + iValue, tValue);
    const YValue = MValue * 12;

    // Calculate result based on return and inflation rates
    let totalPensionFundValue;
    if (rValue > iValue) {
      totalPensionFundValue = (100 / (rValue * 100 - iValue * 100)) * YValue;
    } else {
      totalPensionFundValue = 25 * YValue;
    }

    setPensionFundValue(totalPensionFundValue);
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
            <FormField
              name="monthlyExpensesLater"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="monthlyExpensesLater">
                    <div className="flex items-center gap-">
                      Rencana pengeluaran bulanan saat Anda pensiun nanti?{" "}
                      <span className="text-primary">(MEL)</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="monthlyExpensesLater"
                      type="currency"
                      placeholder="Contoh: Rp. 10.000.000"
                      {...field}
                      className="w-[75%] md:w-[70%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="yearsLater"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="yearsLater">
                    Berapa tahun lagi Anda akan pensiun?{" "}
                    <span className="text-primary">(t)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        id="yearsLater"
                        type="string"
                        placeholder="20"
                        {...field}
                        className="w-[75%] md:w-[70%]"
                      />
                      <span className="text-sm md:text-base">tahun</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="inflation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="inflation">
                    Asumsi Inflasi di Indonesia (Rerata inflasi 10 tahun
                    terakhir yaitu 3,58%/tahun){" "}
                    <span className="text-primary">(i)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        id="inflation"
                        type="string"
                        placeholder="3,58"
                        {...field}
                        className="w-[75%] md:w-[70%]"
                      />
                      <span className="text-sm md:text-base">% / tahun</span>
                    </div>
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
                    Persen-an return investasi Anda per tahun?{" "}
                    <span className="text-primary">(r)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        id="annualReturn"
                        type="string"
                        placeholder="5"
                        {...field}
                        className="w-[75%] md:w-[70%]"
                      />
                      <span className="text-sm md:text-base">% / tahun</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {pensionFundValue ? (
              <div className="p-3 border rounded-xl">
                <p>
                  Berdasarkan <span className="text-primary">4% rule</span>,
                  Anda harus memiliki setidaknya{" "}
                  <span className="underline decoration-primary underline-offset-4">
                    {formatCurrency(pensionFundValue)}
                  </span>{" "}
                  sebagai Dana Pensiun
                </p>
              </div>
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
