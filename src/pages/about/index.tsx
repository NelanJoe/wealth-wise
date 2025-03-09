import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-4 pb-24 md:pt-16 md:pb-40">
      <div className="flex flex-col space-y-12">
        <AboutSection />
        <DeveloperSection />
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        x: { duration: 0.5 },
      }}
      className="space-y-8"
    >
      <h1 className="text-xl font-bold mt-10 underline decoration-primary underline-offset-8">
        Tentang
      </h1>
      <p className="leading-8 text-justify">
        <span className="text-primary font-semibold">Wealth Wise</span> adalah
        sebuah platform yang memudahkan pengguna untuk menghitung investasi,
        dana darurat dan dana pensiun. Fitur kalkulator ini diperuntukan sebagai
        alat bantu pengguna dalam menghitung kebutuhan finansial mereka. Selain
        fitur utama kalkulator, Wealth Wise juga menyediakan fitur forum diskusi
        untuk membantu pengguna dalam berdiskusi dan menyelesaikan masalah
        finansial mereka.
      </p>
    </motion.div>
  );
}

function DeveloperSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        x: { duration: 0.5 },
      }}
      className="space-y-10"
    >
      <h1 className="text-xl font-bold underline decoration-primary underline-offset-8">
        Tentang Pengembang
      </h1>
      <div className="flex flex-row gap-3">
        <img
          src="https://avatars.githubusercontent.com/u/49295389?v=4"
          loading="lazy"
          decoding="async"
          className="w-36 h-36 rounded-xl object-cover md:w-40 md:h-40"
        />
        <div className="space-y-3">
          <div>
            <h1 className="text-lg font-bold">Nelan</h1>
            <p className="text-gray-500">Frontend Developer</p>
          </div>
          <div className="flex flex-row gap-3">
            <a
              href="https://github.com/NelanJoe"
              target="_blank"
              rel="noreferrer"
              className="border border-gray-300 rounded-xl p-2 hover:bg-gray-100/60"
            >
              <img
                src="https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=000000"
                loading="lazy"
                decoding="async"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/nelan/"
              target="_blank"
              rel="noreferrer"
              className="border border-gray-300 rounded-xl p-2 hover:bg-gray-100/60"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
                loading="lazy"
                decoding="async"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://www.instagram.com/nelan_17"
              target="_blank"
              rel="noreferrer"
              className="border border-gray-300 rounded-xl p-2 hover:bg-gray-100/60"
            >
              <img
                src="https://img.icons8.com/?size=100&id=qzegXD7HA9rr&format=png&color=000000"
                loading="lazy"
                decoding="async"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
