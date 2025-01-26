import { Loader2Icon } from "lucide-react";
import { useCurrentUser, useGetEmergencyFund } from "@/hooks";

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

export default function EmergencyFundTable() {
  const { data: currentUser } = useCurrentUser();

  const {
    data: emergencyFund,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEmergencyFund();

  let emergencyFundContent;

  if (isLoading) {
    emergencyFundContent = (
      <TableRow>
        <TableCell colSpan={6} className="h-12 text-center">
          <Loader2Icon className="animate-spin ease-in-out " />
        </TableCell>
      </TableRow>
    );
  }

  if (isSuccess) {
    const emergencyFundFilter = emergencyFund.filter(
      (data) => data.author.uid === currentUser?.uid
    );

    emergencyFundContent = emergencyFundFilter.map((data) => (
      <TableRow key={data.uid}>
        <TableCell>{data.uid.slice(0, 3)}</TableCell>
        <TableCell>
          {data.status === "lajang" ? "Tidak / Belum Menikah" : "Sudah Menikah"}
        </TableCell>
        <TableCell>
          {data.dependents === "ya" ? "Ada Tunjangan" : "Tidak Ada Tunjangan"}
        </TableCell>
        <TableCell>{data.monthlyExpenses}</TableCell>
        <TableCell>{formatCurrency(data.resultEmergencyFund)}</TableCell>
        <TableCell>{formatDate(data.createdAt)}</TableCell>
      </TableRow>
    ));
  }

  if (isError) {
    emergencyFundContent = (
      <TableRow>
        <TableCell colSpan={6} className="h-12 text-center">
          {error.message}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Perhitungan Dana Darurat</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggungan</TableHead>
              <TableHead>Pengeluaran Bulanan</TableHead>
              <TableHead>Jumlah Dana Darurat</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{emergencyFundContent}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
