import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { articles } from "@/lib/contents";

export default function ArticlePage() {
  const tipsMenabung = articles.filter(
    (content) => content.category === "tips-menabung"
  );

  const dasarInvestasi = articles.filter(
    (content) => content.category === "dasar-investasi"
  );

  const lifeStyle = articles.filter(
    (content) => content.category === "lifestyle"
  );

  const rumahTangga = articles.filter(
    (content) => content.category === "rumah-tangga"
  );

  return (
    <div>
      <div className="py-20 bg-blue-500">
        <div className="flex flex-row-reverse items-center justify-between max-w-4xl px-4 mx-auto">
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
              src="/assets/article.svg"
              alt="disscussion"
              loading="lazy"
              className="object-cover w-[160px] md:w-[380px]"
            />
          </motion.div>
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
            <h2 className="text-2xl md:text-4xl font-semibold leading-snug text-white ">
              Artikel
            </h2>
            <p className="text-sm md:text-lg text-white">
              Yuk tingkatkan literasi finansialmu
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl px-4 py-20 mx-auto">
        <div className="flex flex-col space-y-12">
          {/* Tips Menabung */}
          <article>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="flex flex-col gap-2 mb-4"
            >
              <h2 className="text-xl font-semibold md:text-2xl">
                Tips Menabung<span className="text-blue-500">.</span>
              </h2>
              <div className="h-[2px] w-48 bg-blue-500"></div>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
              {tipsMenabung.map((article) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    y: { duration: 0.5 },
                  }}
                  className="p-4 border min-h-[250px] rounded-lg shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h1 className="text-lg font-semibold">{article.title}</h1>
                    <p className="mt-3 text-gray-700 line-clamp-3 ">
                      {article.desc}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full mt-4">
                    <Link
                      to={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full font-semibold bg-blue-500 hover:bg-blue-500/80">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </article>
          {/* End Tips Menabung */}
          {/* Dasar Investasi */}
          <article>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="flex flex-col gap-2 mb-4"
            >
              <h2 className="text-xl font-semibold md:text-2xl">
                Dasar Investasi<span className="text-blue-500">.</span>
              </h2>
              <div className="h-[2px] w-48 bg-blue-500"></div>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
              {dasarInvestasi.map((article) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    y: { duration: 0.5 },
                  }}
                  className="p-4 border min-h-[250px] rounded-lg shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h1 className="text-lg font-semibold">{article.title}</h1>
                    <p className="mt-3 text-gray-700 line-clamp-3 ">
                      {article.desc}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full mt-4">
                    <Link
                      to={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full font-semibold bg-blue-500 hover:bg-blue-500/80">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </article>
          {/* End Dasar Investasi */}
          {/* Lifestyle */}
          <article>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="flex flex-col gap-2 mb-4"
            >
              <h2 className="text-xl font-semibold md:text-2xl">
                Gaya Hidup<span className="text-blue-500">.</span>
              </h2>
              <div className="h-[2px] w-36 bg-blue-500"></div>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
              {lifeStyle.map((article) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    y: { duration: 0.5 },
                  }}
                  className="p-4 border min-h-[250px] rounded-lg shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h1 className="text-lg font-semibold">{article.title}</h1>
                    <p className="mt-3 text-gray-700 line-clamp-3 ">
                      {article.desc}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full mt-4">
                    <Link
                      to={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full font-semibold bg-blue-500 hover:bg-blue-500/80">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </article>
          {/* End Lifestyle */}
          {/* Rumah Tangga */}
          <article>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="flex flex-col gap-2 mb-4"
            >
              <h2 className="text-xl font-semibold md:text-2xl">
                Rumah Tangga<span className="text-blue-500">.</span>
              </h2>
              <div className="h-[2px] w-48 bg-blue-500"></div>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
              {rumahTangga.map((article) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    y: { duration: 0.5 },
                  }}
                  className="p-4 border min-h-[250px] rounded-lg shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h1 className="text-lg font-semibold">{article.title}</h1>
                    <p className="mt-3 text-gray-700 line-clamp-3 ">
                      {article.desc}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full mt-4">
                    <Link
                      to={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full font-semibold bg-blue-500 hover:bg-blue-500/80">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </article>
          {/* End Rumah Tangga */}
        </div>
      </div>
    </div>
  );
}
