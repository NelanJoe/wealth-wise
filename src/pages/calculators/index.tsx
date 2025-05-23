import { Fragment } from "react";
import { motion } from "framer-motion";

import EmergencyFund from "@/components/emergency-fund";
import Invesment from "@/components/investment";
import PensionFund from "@/components/pension-fund";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetaHead from "@/components/common/meta-head";

export default function CalculatorPage() {
  return (
    <Fragment>
      <MetaHead title="Kalkulator" />
      <div className="py-20 bg-blue-500">
        <div className="flex flex-row items-center justify-between max-w-5xl px-4 mx-auto">
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
            <h2 className="text-2xl font-semibold md:text-4xl">Kalkulator</h2>
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
      <div className="max-w-5xl px-4 py-20 mx-auto">
        <Tabs defaultValue="investasi">
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
    </Fragment>
  );
}
