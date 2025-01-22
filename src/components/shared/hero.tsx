import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <div className="flex items-center justify-between w-full gap-4 md:min-h-dvh">
      <div className="space-y-4 md:w-1/2">
        <h2 className="text-3xl font-semibold leading-relaxed md:text-4xl md:leading-normal lg:leading-normal">
          Raih Finansial Freedom Dengan{" "}
          <span className="text-blue-500">Wealth Wise</span>.
        </h2>
        <p className="text-gray-500">
          Kami membantu anda menemukan solusi finansial yang sesuai dengan
          kebutuhan anda
        </p>
        <Button
          className="rounded-full bg-blue-500 hover:bg-blue-500/80"
          asChild
        >
          <Link to="/kalkulator">
            <div className="flex flex-row items-center gap-1">
              <p>Coba Sekarang</p>
              <ArrowRightIcon className="w-4 h-4 text-white" />
            </div>
          </Link>
        </Button>
      </div>
      <div className="hidden md:block">
        <img
          src="assets/banknote.svg"
          alt="banknote"
          loading="lazy"
          className="object-cover w-full md:w-[480px] h-fit"
        />
      </div>
    </div>
  );
}
