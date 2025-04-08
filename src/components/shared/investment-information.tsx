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
          <InfoIcon className="w-4 h-4 mr-2 text-blue-500" />
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
          <p className="font-bold">Future Value dari Aset Awal (Lump Sum)</p>
          <div className="my-8">
            <b className="text-lg font-mono italic text-blue-600">
              FV = PV x (1 + <sup>i</sup>)<sup>n</sup>
            </b>
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-bold italic">FV (Future Value)</span> = Nilai
            masa depan
            <br />
            <span className="font-bold italic">PV (Present Value)</span> = Nilai
            awal atau pokok
            <br />
            <span className="font-bold italic">i</span> = Tingkat suku bunga
            tahunan (desimal)
            <br />
            <span className="font-bold italic">n</span> = Lama investasi (tahun)
          </p>
        </div>

        {/* Future Value Suku Bunga Majemuk */}
        <div className="border-b pb-3 mt-4">
          <p className="font-bold">
            Future Value dari Anuitas Jatuh Tempo (Annuity Due)
          </p>
          <div className="my-6">
            <b className="text-lg font-mono italic text-blue-600">
              FV = PMT x (
              <span className="inline-block text-center align-middle">
                <span className="border-b-2 border-blue-600">
                  (1 + r)<sup>n</sup> − 1
                </span>
                <br />
                <span className="bottom">r</span>
              </span>
              ) × (1 + r)
            </b>
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-bold italic">FV (Future Value)</span> = Nilai
            masa depan
            <br />
            <span className="font-bold italic">PMT</span> = Kontribusi berkala,
            jumlah yang disetor secara teratur pada setiap periode (bulanan).
            <br />
            <span className="font-bold italic">r</span> = Tingkat bunga per
            periode (dalam desimal, misalnya 5% = 0.05).
            <br />
            <span className="font-bold italic">t</span> = Lama investasi (dalam
            tahun)
          </p>
          <p className="text-sm text-gray-500 my-2">
            Rumus diatas didapatkan melalui referensi dari:{" "}
            <a
              href="https://www.investopedia.com/retirement/calculating-present-and-future-value-of-annuities/"
              target="_blank"
              className="italic text-blue-500"
            >
              Investopedia
            </a>
          </p>
        </div>
        {/* Contoh Perhitungan */}
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <p className="font-bold">Contoh Perhitungan:</p>
          <p className="text-sm text-gray-700">
            Jika Anda memiliki investasi awal sebesar{" "}
            <span className="font-bold">Rp 10.000.000</span>, menabung{" "}
            <span className="font-bold">Rp 1.000.000</span> per bulan dengan
            suku bunga tahunan <span className="font-bold">6%</span>
            selama <span className="font-bold">5 tahun</span>, maka total
            investasi dapat dihitung dengan rumus di atas sebagai berikut:{" "}
            <span className="font-bold text-primary">Rp 83.607.382</span>
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
