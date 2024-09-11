import { motion } from "framer-motion";

export default function CalculatorPage() {
  return (
    <div>
      <div className="py-20 bg-blue-500">
        <div className="flex flex-row items-center justify-between max-w-4xl px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              x: { duration: 0.5 },
            }}
            className="space-y-2 text-white"
          >
            <h2 className="text-2xl md:text-4xl font-semibold">Kalkulator</h2>
            <div className="space-y-1">
              <p className="text-sm md:text-lg">Untuk Hitung Investasi</p>
              <p className="text-sm md:text-lg">Untuk Hitung Dana Darurat</p>
              <p className="text-sm md:text-lg">Untuk Hitung Dana Pensiun</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              x: { duration: 0.5 },
            }}
          >
            <img
              src="/assets/calculator-page.svg"
              alt="calculator"
              loading="lazy"
              className="object-cover w-[170px] md:w-[380px]"
            />
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl px-4 py-20 mx-auto">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center justify-center p-4 border rounded-md shadow">
            <p>Lorem, ipsum.</p>
          </div>
          <div className="flex items-center justify-center p-4 border rounded-md shadow">
            <p>Lorem, ipsum.</p>
          </div>
          <div className="flex items-center justify-center p-4 border rounded-md shadow">
            <p>Lorem, ipsum.</p>
          </div>
        </div>

        <div className="py-8">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            voluptas voluptatum iste quam. Quae voluptatem exercitationem ut
            rem, velit quisquam!
          </p>
        </div>
      </div>
    </div>
  );
}
