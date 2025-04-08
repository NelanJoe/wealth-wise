import { motion, useInView } from "framer-motion";
import {
  AlertCircleIcon,
  CalculatorIcon,
  HandHeartIcon,
  MessageSquareCodeIcon,
  NewspaperIcon,
  PersonStandingIcon,
} from "lucide-react";

import Hero from "@/components/shared/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/libs/contents";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section>
      <div className="max-w-5xl px-4 py-20 mx-auto md:py-0">
        <Hero />
      </div>
      {/* Features */}
      <div className="py-20 bg-blue-500 ">
        <div className="flex flex-col-reverse justify-between h-full max-w-5xl gap-16 px-4 mx-auto md:gap-20 item-center md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              y: { duration: 0.5 },
            }}
            className="p-4 bg-white rounded-md md:w-1/2"
          >
            <img
              src="/assets/calculator.svg"
              alt="calculator"
              className="object-cover h-fit"
              loading="lazy"
            />
          </motion.div>
          <div className="self-center space-y-3 md:w-1/2">
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              className="mb-8 text-3xl font-semibold text-white"
            >
              Gratis untuk anda
            </motion.h1>
            <div>
              <motion.ul
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                  y: { duration: 0.5 },
                }}
                className="flex flex-col gap-3"
              >
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-white border rounded-lg shadow-md">
                    <CalculatorIcon className="w-6 h-6" />
                  </div>
                  <span className="text-white">Kalkulator Investasi</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-white border rounded-lg shadow-md">
                    <HandHeartIcon className="w-6 h-6" />
                  </div>
                  <span className="text-white">Hitung Dana Pensiun</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-white border rounded-lg shadow-md">
                    <AlertCircleIcon className="w-6 h-6" />
                  </div>
                  <span className="text-white">Hitung Dana Darurat</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-white border rounded-lg shadow-md">
                    <MessageSquareCodeIcon className="w-6 h-6" />
                  </div>
                  <span className="text-white">Forum Diskusi</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-white border rounded-lg shadow-md">
                    <NewspaperIcon className="w-6 h-6" />
                  </div>
                  <span className="text-white">
                    Artikel Panduan untuk membantu Anda mencapai tujuan keuangan
                    Anda
                  </span>
                </li>
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Features */}
      {/* Benefits */}
      <div className="py-20 border-b bg-gray-200/30">
        <div className="max-w-5xl px-4 mx-auto ">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
            className="flex flex-col items-center justify-center gap-3 mb-10"
          >
            <h2 className="text-2xl font-semibold text-center ">
              Kenapa Harus Menggunakan Wealth Wise?
            </h2>
            <div className="bg-blue-500 w-32 h-[2px]"></div>
          </motion.div>
        </div>
        <div className="max-w-5xl px-4 mx-auto">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              className="p-4 space-y-3 bg-white border rounded-lg"
            >
              <div className="p-2 border rounded-lg shadow-sm w-fit">
                <CalculatorIcon className="w-5 h-5" />
              </div>
              <h3 className="md:text-lg font-medium">Perencanaan Keuangan</h3>
              <p className="text-sm text-gray-600">
                WealthWise menawarkan kalkulator investasi, hitung dana
                pensiun,dan hitung dana darurat yang sangat berguna untuk
                perencanaan keuangan Anda secara jangka panjang.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              className="p-4 space-y-3 bg-white border rounded-lg"
            >
              <div className="p-2 border rounded-lg shadow-sm w-fit">
                <MessageSquareCodeIcon className="w-5 h-5" />
              </div>
              <h3 className="md:text-lg font-medium">Forum Diskusi</h3>
              <p className="text-sm text-gray-600">
                WealthWise menyediakan forum diskusi di mana pengguna dapat
                berinteraksi, bertukar informasi, dan belajar dari pengalaman
                satu sama lain
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              className="p-4 space-y-3 bg-white border rounded-lg"
            >
              <div className="p-2 border rounded-lg shadow-sm w-fit">
                <NewspaperIcon className="w-5 h-5" />
              </div>
              <h3 className="md:text-lg font-medium">
                Artikel Panduan dan Edukasi
              </h3>
              <p className="text-sm text-gray-600">
                WealthWise memiliki koleksi artikel panduan yang membantu Anda
                untuk memahami berbagai aspek keuangan, dari dasar-dasar
                investasi hingga strategi perencanaan keuangan yang lebih
                kompleks.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              className="p-4 space-y-3 bg-white border rounded-lg"
            >
              <div className="p-2 border rounded-lg shadow-sm w-fit">
                <PersonStandingIcon className="w-5 h-5" />
              </div>
              <h3 className="md:text-lg font-medium">Kemudahan Akses</h3>
              <p className="text-sm text-gray-600">
                WealthWise dapat diakses kapan pun dan dimana pun dengan mudah
                melalui halaman aplikasi Web WealthWise di berbagai perangkat
                seperti smartphone, tablet, desktop, hingga laptop.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* End Benefits */}
      {/* FAQ */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
            className="flex flex-col items-center justify-center gap-3 mb-10"
          >
            <h2 className="text-2xl font-semibold text-center ">
              Frequently Asked Questions
            </h2>
            <div className="bg-blue-500 w-32 h-[2px]"></div>
          </motion.div>
          <div>
            <Accordion
              type="single"
              collapsible
              className="flex flex-col w-full gap-3"
            >
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  value={faq.question}
                  ref={ref}
                  style={{
                    transform: isInView ? "none" : "translateY(100px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)",
                  }}
                  className="px-4 py-1 border rounded-md"
                >
                  <AccordionTrigger className="font-medium md:font-medium md:text-lg text-left no-underline hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      {/* End FAQ */}
    </section>
  );
}
