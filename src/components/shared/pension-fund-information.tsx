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
          Cara Hitung
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Formula Hitung Investasi</DialogTitle>
          <DialogDescription>
            Berikut ini adalah cara hitung investasi:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <b>
            Pertama, ketahui M sebagai Future Value dari Pengeluaran Bulanan
          </b>
          <p>
            M = MEL * (1 + i)<sup>t</sup>
          </p>
          <br />
          <b>Kedua, ketahui Y sebagai Pengeluaran Tahunan</b>
          <p>Y = M * 12</p>
          <br />
          <b>Berdasarkan Aturan 4% Rule,</b>
          <p>{"jika r > i, maka Dana Pensiun = [100/(r- i)] * Y"}</p>
          <p>{"jika r <= i, maka Dana Pensiun = 25 * Y"}</p>
        </div>
        <DialogFooter className="sm:justify-start">
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
