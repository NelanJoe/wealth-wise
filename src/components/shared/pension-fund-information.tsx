import { InfoIcon } from "lucide-react";
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

export default function PensionFundInformation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full md:w-fit"
        >
          <InfoIcon className="w-4 h-4 mr-2 text-blue-500" />
          Cara Hitung
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-screen overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">
            Formula Hitung Dana Pensiun
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Gunakan panduan berikut untuk menghitung dana pensiun yang
            dibutuhkan berdasarkan pengeluaran bulanan dan inflasi.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 border-b pb-6 mt-4">
          <div>
            <p className="font-semibold text-lg">
              1. Future Value dari Pengeluaran Bulanan (M)
            </p>
            <p className="text-lg font-mono text-blue-600">
              M = MEL × (1 + i)<sup>t</sup>
            </p>
            <p className="text-sm text-gray-600">
              <b>MEL</b> = Pengeluaran bulanan saat ini <br />
              <b>i</b> = Inflasi tahunan (dalam desimal) <br />
              <b>t</b> = Jumlah tahun hingga pensiun
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">2. Pengeluaran Tahunan (Y)</p>
            <p className="text-lg font-mono text-blue-600">Y = M × 12</p>
            <p className="text-sm text-gray-600">
              Pengeluaran tahunan dihitung dari total pengeluaran bulanan dikali
              12.
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">3. Aturan 4% Rule</p>
            <p className="text-lg font-mono text-blue-600">
              Jika <b>r &gt; i</b>, maka Dana Pensiun = (100 / (r - i)) × Y
            </p>
            <p className="text-lg font-mono text-blue-600">
              Jika <b>r ≤ i</b>, maka Dana Pensiun = 25 × Y
            </p>
            <p className="text-sm text-gray-600">
              <b>r</b> = Imbal hasil investasi tahunan (dalam desimal) <br />
              Jika tingkat imbal hasil lebih besar dari inflasi, maka digunakan
              rumus pertama. Jika tidak, digunakan rumus kedua.
            </p>
          </div>
        </div>

        {/* Contoh Perhitungan */}
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <p className="font-bold text-lg">Contoh Perhitungan:</p>
          <p className="text-sm text-gray-700">
            Misalkan Anda memiliki pengeluaran bulanan sebesar{" "}
            <span className="font-bold">Rp10.000.000</span>, dan ingin pensiun
            dalam <span className="font-bold">20 tahun</span>. Inflasi tahunan
            diasumsikan <span className="font-bold">5%</span> dan imbal hasil
            investasi adalah <span className="font-bold">10%</span>.
          </p>
          <div className="mt-3">
            <p className="text-sm text-gray-700">
              1. Hitung pengeluaran bulanan saat pensiun:
            </p>
            <p className="text-lg font-semibold">
              M = 10.000.000 × (1 + 0.05)<sup>20</sup>
            </p>
            <p className="text-lg font-semibold text-blue-600">
              M = Rp26.532.977
            </p>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-700">
              2. Hitung pengeluaran tahunan:
            </p>
            <p className="text-lg font-semibold">Y = 26.532.977 × 12</p>
            <p className="text-lg font-semibold text-blue-600">
              Y = Rp318.395.724
            </p>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-700">
              3. Hitung dana pensiun dengan aturan 4%:
            </p>
            <p className="text-lg font-semibold">
              Dana Pensiun = (100 / (0.10 - 0.05)) × 318.395.724
            </p>
            <p className="text-lg font-semibold text-blue-600">
              Dana Pensiun = Rp6.367.914.480
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-700">
            Perhitungan ini membantu Anda mengetahui jumlah dana pensiun yang
            dibutuhkan agar tetap memiliki pengeluaran yang stabil setelah
            pensiun.
          </p>
        </div>

        <DialogFooter className="sm:justify-start mt-6">
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
