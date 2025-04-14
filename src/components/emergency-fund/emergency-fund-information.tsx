import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EmergencyFundInformation() {
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
      <DialogContent className="sm:max-w-3xl max-h-screen overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">
            Formula Hitung Dana Darurat
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Gunakan panduan berikut untuk menentukan jumlah dana darurat yang
            diperlukan sesuai dengan kondisi finansial Anda.
          </DialogDescription>
        </DialogHeader>

        <div className="border-b pb-6 mt-4">
          <ul className="list-inside list-decimal space-y-4 text-gray-700">
            <li>
              <span className="text-lg font-semibold">
                Menanggung diri sendiri:
              </span>{" "}
              <span className="font-bold">6 kali</span> pengeluaran bulanan.
            </li>
            <li>
              <span className="text-lg font-semibold">
                Belum menikah, tetapi memiliki tanggungan:
              </span>{" "}
              <span className="font-bold">9 kali</span> pengeluaran bulanan.
            </li>
            <li>
              <span className="text-lg font-semibold">
                Sudah menikah, tanpa tanggungan:
              </span>{" "}
              <span className="font-bold">9 kali</span> pengeluaran bulanan.
            </li>
            <li>
              <span className="text-lg font-semibold">
                Sudah menikah dan memiliki tanggungan:
              </span>{" "}
              <span className="font-bold">12 kali</span> pengeluaran bulanan.
            </li>
          </ul>
        </div>

        {/* Contoh Perhitungan */}
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <p className="font-bold text-lg">Contoh Perhitungan:</p>
          <p className="text-sm text-gray-700">
            Jika pengeluaran bulanan Anda sebesar{" "}
            <span className="font-bold">Rp5.000.000</span> dan Anda sudah
            menikah serta memiliki tanggungan, maka dana darurat yang disarankan
            adalah:
          </p>
          <p className="mt-3 text-lg font-semibold">
            12 × Rp5.000.000 ={" "}
            <span className="text-blue-600">Rp60.000.000</span>
          </p>
          <p className="text-sm text-gray-700 mt-3">
            Artinya, Anda sebaiknya memiliki dana darurat minimal sebesar{" "}
            <span className="font-bold">Rp60.000.000</span> untuk menghadapi
            keadaan tak terduga.
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-700">
            Dana darurat sangat penting untuk menghadapi situasi tak terduga
            seperti kehilangan pekerjaan, keadaan darurat medis, atau kebutuhan
            mendesak lainnya. Pastikan Anda memiliki jumlah yang cukup sesuai
            dengan kondisi keuangan dan tanggungan yang Anda miliki.
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
