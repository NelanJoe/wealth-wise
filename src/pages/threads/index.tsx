import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SquarePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Threads() {
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
            className="space-y-2"
          >
            <h2 className="text-2xl font-semibold leading-snug text-white md:text-4xl">
              Forum Diskusi
            </h2>
            <p className="text-sm text-white md:text-lg">
              Lagi pengen bahas apa hari ini?
            </p>
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
              src="/assets/discussion.svg"
              alt="disscussion"
              loading="lazy"
              className="object-cover w-[160px] md:w-[380px]"
            />
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl px-4 py-20 mx-auto">
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Diskusi Aktif<span className="text-blue-500">.</span>
            </h2>
            <div className="h-[2px] w-36 bg-blue-500"></div>
          </div>
          <div>
            <Button
              asChild
              className="w-full bg-blue-500 rounded-full hover:bg-blue-500/80"
            >
              <Link to="/threads/create">
                <div className="flex flex-row items-center gap-1">
                  <SquarePlusIcon className="w-5 h-5" />
                  <span>Buat Diskusi Baru</span>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl px-4 py-20 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6"></div>
      </div>
    </div>
  );
}
