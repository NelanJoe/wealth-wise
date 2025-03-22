import { Button } from "../ui/button";
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

export default function InvestmentInformation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full md:w-fit"
        >
          Cara Hitung
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Formula Hitung Investasi</DialogTitle>
          <DialogDescription className="text-gray-500">
            Berikut ini adalah cara menghitung investasi berdasarkan nilai aset
            awal dan tabungan bulanan:
          </DialogDescription>
        </DialogHeader>

        {/* Future Value dari Aset Awal */}
        <div className="border-b pb-3">
          <p className="font-bold">A: Future Value dari Aset Awal</p>
          <p className="text-lg font-mono text-blue-600">
            A = P (1 + <sup>r</sup>/<sub>12</sub>)<sup>12t</sup>
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold">P</span> = Nilai awal investasi <br />
            <span className="font-bold">r</span> = Suku bunga tahunan (desimal){" "}
            <br />
            <span className="font-bold">t</span> = Lama investasi (tahun)
          </p>
        </div>

        {/* Future Value dari Tabungan Bulanan */}
        <div className="border-b pb-3 mt-4">
          <p className="font-bold">B: Future Value dari Tabungan Bulanan</p>
          <p className="text-lg font-mono text-blue-600">
            B = PMT × ((1 + <sup>r</sup>/<sub>12</sub>)<sup>12t</sup> - 1) / (
            <sup>r</sup>/<sub>12</sub>)
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold">PMT</span> = Jumlah tabungan bulanan
          </p>
        </div>

        {/* Contoh Perhitungan */}
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <p className="font-bold">Contoh Perhitungan:</p>
          <p className="text-sm text-gray-700">
            Jika Anda memiliki investasi awal sebesar{" "}
            <span className="font-bold">Rp10.000.000</span>, menabung{" "}
            <span className="font-bold">Rp1.000.000</span> per bulan dengan suku
            bunga tahunan <span className="font-bold">6%</span>
            selama <span className="font-bold">5 tahun</span>, maka total
            investasi dapat dihitung dengan rumus di atas.
          </p>
        </div>

        <DialogFooter className="sm:justify-start mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
