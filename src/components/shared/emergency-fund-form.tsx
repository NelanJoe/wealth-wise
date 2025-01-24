import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { formatCurrency } from "@/lib/format-currency";
import { emergencyFundSchema } from "@/schemas/calculator.schema";

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "../ui/select";

export default function EmergencyFundForm() {
  const form = useForm({
    resolver: zodResolver(emergencyFundSchema),
    defaultValues: {
      status: "",
      dependents: "",
      monthlyExpenses: "",
    },
  });

  const [emergencyFundAmount, setEmergencyFundAmount] = useState<number>(0);

  const onSubmit: SubmitHandler<z.infer<typeof emergencyFundSchema>> = ({
    status,
    dependents,
    monthlyExpenses,
  }) => {
    /**
     * Status: Lajang, Ada tunjangan (6), Tidak ada tunjangan (4)
     * Status: Menikah, Ada tunjangan (12), Tidak ada tunjangan (9)
     */
    const fundMultiplierMap: {
      [key: string]: {
        [key: string]: number;
      };
    } = {
      lajang: {
        ya: 6,
        tidak: 4,
      },
      menikah: {
        ya: 12,
        tidak: 9,
      },
    };

    const fundMultiplier = fundMultiplierMap[status][dependents];
    const monthlyExpensesNum = Number(monthlyExpenses.replace(/[^0-9]/g, ""));

    const resultEmergencyFund = fundMultiplier * monthlyExpensesNum;
    setEmergencyFundAmount(resultEmergencyFund);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Dana Darurat</CardTitle>
            <CardDescription>
              Perhitungan dana darurat untuk kebutuhan jangka panjang
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" size="sm" variant="outline">
                Cara Hitung
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Formula Hitung Dana Darurat</DialogTitle>
                <DialogDescription>
                  Berikut ini adalah semua kemungkinan yang dapat terjadi:
                </DialogDescription>
              </DialogHeader>
              <div>
                <ul className="list-inside list-decimal space-y-2">
                  <li>
                    Anda hanya menanggung diri sendiri. Dana Darurat Anda adalah
                    6 kali pengeluaran bulanan.
                  </li>
                  <li>
                    Anda belum menikah, tetapi punya tanggungan lain. Dana
                    Darurat Anda adalah 9 kali pengeluaran bulanan.
                  </li>
                  <li>
                    Anda sudah menikah, tetapi tidak punya tanggungan lain. Dana
                    Darurat Anda adalah 9 kali pengeluaran bulanan.
                  </li>
                  <li>
                    Anda sudah menikah dan punya tanggungan lain. Dana Darurat
                    Anda adalah 12 kali pengeluaran bulanan.
                  </li>
                </ul>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-5">
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apa status Anda?</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="lajang">
                            Tidak / Belum Menikah
                          </SelectItem>
                          <SelectItem value="menikah">Sudah Menikah</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="dependents"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Apakah mungkin Anda punya tanggungan lain, seperti anak,
                    orangtua, ataupun kerabat?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tunjangan</SelectLabel>
                          <SelectItem value="ya">Ya Punya</SelectItem>
                          <SelectItem value="tidak">
                            Tidak / Belum Punya
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="monthlyExpenses"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berapa pengeluaran Anda setiap bulan?</FormLabel>
                  <FormControl>
                    <Input
                      type="currency"
                      placeholder="Contoh Rp. 1.000.000"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <p>
                Jumlah dana darurat minimal yang Anda butuhkan adalah:{" "}
                {formatCurrency(emergencyFundAmount)}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-fit">
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
