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

export default function EmergencyFundInformation() {
  return (
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
          <ul className="list-inside list-decimal space-y-2 text-wrap ">
            <li>
              Anda hanya menanggung diri sendiri. Dana Darurat Anda adalah 6
              kali pengeluaran bulanan.
            </li>
            <li>
              Anda belum menikah, tetapi punya tanggungan lain. Dana Darurat
              Anda adalah 9 kali pengeluaran bulanan.
            </li>
            <li>
              Anda sudah menikah, tetapi tidak punya tanggungan lain. Dana
              Darurat Anda adalah 9 kali pengeluaran bulanan.
            </li>
            <li>
              Anda sudah menikah dan punya tanggungan lain. Dana Darurat Anda
              adalah 12 kali pengeluaran bulanan.
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
  );
}
