import { Loader2Icon } from "lucide-react";

import { useCurrentUser, useGetInvesments } from "@/hooks";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function InvestmentTable() {
  const { data: currentUser } = useCurrentUser();
  const {
    data: invesments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetInvesments();

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
            </TableRow>
          </TableHeader>
          <TableBody>{invesmentsContent}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
