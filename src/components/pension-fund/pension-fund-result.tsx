import { motion } from "framer-motion";
import { formatCurrency } from "@/libs/format-currency";

export default function PensionFundResult({ value }: { value: number }) {
  if (!value) return null;

  return (
    <motion.div
      key="investmentValue"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border p-3 rounded-xl w-[80%] md:w-[86%] text-sm"
    >
      <p>
        Berdasarkan <span className="text-primary">4% rule</span>, Anda harus
        memiliki setidaknya{" "}
        <span className="underline text-primary underline-offset-8 decoration-primary">
          {formatCurrency(value)}
        </span>{" "}
        sebagai Dana Pensiun
      </p>
    </motion.div>
  );
}
