import { motion } from "framer-motion";

import EmergencyFund from "@/components/shared/emergency-fund";
import Invesment from "@/components/shared/invesment";
import PensionFund from "@/components/shared/pension-fund";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <Tabs defaultValue="dana-pensiun">
          <TabsList className="grid w-full grid-cols-3 ">
            <TabsTrigger value="investasi">Investasi</TabsTrigger>
            <TabsTrigger value="dana-darurat">Dana Darurat</TabsTrigger>
            <TabsTrigger value="dana-pensiun">Dana Pensiun</TabsTrigger>
          </TabsList>
          <TabsContent value="investasi">
            <Invesment />
          </TabsContent>
          <TabsContent value="dana-darurat">
            <EmergencyFund />
          </TabsContent>
          <TabsContent value="dana-pensiun">
            <PensionFund />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
