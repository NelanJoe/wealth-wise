import { motion } from "framer-motion";
import { formatCurrency } from "@/libs/format-currency";

export default function InvestmentResult({
  value,
  years,
}: {
  value: number;
  years: string;
}) {
  if (!value) return null;

  return (
    <motion.div
      key="investmentValue"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border p-3 rounded-xl w-[75%] md:w-[70%] text-sm"
    >
      <p>
        Perkiraan jumlah investasi Anda pada setelah{" "}
        <span className="text-primary">{years || 0} tahun</span> lagi sebesar{" "}
        <span className="underline text-primary underline-offset-8 decoration-primary">
          {formatCurrency(value)}
        </span>
      </p>
    </motion.div>
  );
}
