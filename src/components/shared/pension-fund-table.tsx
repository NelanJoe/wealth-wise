import { Loader2Icon, Trash2Icon } from "lucide-react";

import {
  useCurrentUser,
  useDeltePensionFund,
  useGetPensionFund,
} from "@/hooks";
import { formatDate } from "@/lib/format-date";
import { formatCurrency } from "@/lib/format-currency";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function PensionFundTable() {
  const { data: currentUser } = useCurrentUser();

  const {
    data: pensionFund,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPensionFund();

  const { deletePensionFund, isPending } = useDeltePensionFund();

  let pensionFundContent;

  if (isLoading) {
    pensionFundContent = (
      <TableRow>
        <TableCell colSpan={6} className="h-12 text-center">
          <Loader2Icon className="animate-spin ease-in-out " />
        </TableCell>
      </TableRow>
    );
  }

  if (isSuccess) {
    const pensionFundFilter = pensionFund.filter(
      (data) => data.author.uid === currentUser?.uid
    );

    pensionFundContent = (
      <>
        {pensionFundFilter.length > 0 ? (
          pensionFundFilter.map((data) => (
            <TableRow key={data.uid}>
              <TableCell>{data.uid.slice(0, 3)}</TableCell>
              <TableCell>{data.monthlyExpensesLater}</TableCell>
              <TableCell>{`${data.yearsLater} tahun`}</TableCell>
              <TableCell>{`${data.inflation}% / tahun`}</TableCell>
              <TableCell>{`${data.annualReturn}% / tahun`}</TableCell>
              <TableCell>{formatCurrency(data.resultPensionFund)}</TableCell>
              <TableCell>{formatDate(data.createdAt)}</TableCell>
              <TableCell>
                <button
                  type="button"
                  className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-500/80 transition-all duration-150 ease-in"
                  onClick={() => deletePensionFund(data.uid)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2Icon className="w-4 h-4 " />
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-12 text-center">
              Tidak ada riwayat perhitungan dana investasi
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }

  if (isError) {
    pensionFundContent = (
      <TableRow>
        <TableCell colSpan={6} className="h-12 text-center">
          {error?.message}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Perhitungan Dana Pensiun</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>
                Rencana Pengeluaran Bulanan{" "}
                <span className="text-primary">(MEL)</span>
              </TableHead>
              <TableHead>
                Masa Pensiun <span className="text-primary">(t)</span>
              </TableHead>
              <TableHead>
                Rerata Inflasi <span className="text-primary">(i)</span>
              </TableHead>
              <TableHead>
                Durasi Investasi <span className="text-primary">(r)</span>
              </TableHead>
              <TableHead>Jumlah Dana Pensiun</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{pensionFundContent}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
