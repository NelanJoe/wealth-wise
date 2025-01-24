import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function EmergencyFundTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Perhitungan Dana Darurat</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggungan</TableHead>
              <TableHead>Pengeluaran Bulanan</TableHead>
              <TableHead>Jumlah Dana Darurat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>Belum Menikah</TableCell>
                <TableCell>Tidak Punya</TableCell>
                <TableCell>Rp. 1.500.000</TableCell>
                <TableCell>Rp. 9.000.000</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
