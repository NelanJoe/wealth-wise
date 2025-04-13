import { Loader2Icon, Trash2Icon } from "lucide-react";

import { useCurrentUser, useDeleteInvestment, useGetInvesments } from "@/hooks";
import { formatCurrency } from "@/libs/format-currency";
import { formatDate } from "@/libs/format-date";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function InvestmentTable() {
  const { data: currentUser } = useCurrentUser();
  const {
    data: invesments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetInvesments();

  const { deleteInvestment, isPending } = useDeleteInvestment();

  let invesmentsContent;

  if (isLoading) {
    invesmentsContent = (
      <TableRow>
        <TableCell colSpan={7} className="h-16 text-center">
          <Loader2Icon className="ease-in-out animate-spin " />
        </TableCell>
      </TableRow>
    );
  }

  if (isSuccess) {
    const invesmentsFilter = invesments.filter(
      (data) => data.author.uid === currentUser?.uid
    );

    invesmentsContent =
      invesmentsFilter.length > 0 ? (
        invesmentsFilter.map((data) => (
          <TableRow key={data.uid}>
            <TableCell>{data.uid.slice(0, 3)}</TableCell>
            <TableCell>{data.currentlyAmount}</TableCell>
            <TableCell>{data.monthlySaving}</TableCell>
            <TableCell>{`${data.annualReturn}% / tahun`}</TableCell>
            <TableCell>{`${data.years} tahun`}</TableCell>
            <TableCell>{formatCurrency(data.resultInvestment)}</TableCell>
            <TableCell>{formatDate(data.createdAt)}</TableCell>
            <TableCell>
              <button
                type="button"
                className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-500/80 transition-all duration-150 ease-in"
                onClick={() => deleteInvestment(data.uid)}
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
          <TableCell colSpan={7} className="h-16 text-center">
            Tidak ada riwayat perhitungan investasi
          </TableCell>
        </TableRow>
      );
  }

  if (isError) {
    invesmentsContent = (
      <TableRow>
        <TableCell colSpan={7} className="h-12 text-center">
          {error.message}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Perhitungan Investasi</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>
                Aset Awal <span className="text-primary">(P)</span>
              </TableHead>
              <TableHead>
                Tabungan Perbulan <span className="text-primary">(PMT)</span>
              </TableHead>
              <TableHead>
                Tingkat Bunga <span className="text-primary">(r)</span>
              </TableHead>
              <TableHead>
                Durasi Investasi <span className="text-primary">(t)</span>
              </TableHead>
              <TableHead>Jumalah Dana Investasi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{invesmentsContent}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
