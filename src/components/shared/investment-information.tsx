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
          <DialogDescription>
            Berikut ini adalah cara hitung investasi:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <b>Total = A + B</b>
          </p>
          <div>
            <p>
              <b>A: Future Value dari Aset Awal</b>
            </p>
            <p>
              A = P (1 + <sup>r</sup>&frasl;<sub>12</sub>)<sup>12t</sup>
            </p>
          </div>
          <div>
            <p>
              <b>B: Future Value dari Tabungan Bulanan</b>
            </p>
            <p>
              B = PMT * ((1 + <sup>r</sup>&frasl;<sub>12</sub>)<sup>12t</sup> -
              1)/ (<sup>r</sup>&frasl;<sub>12</sub>)
            </p>
          </div>
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
