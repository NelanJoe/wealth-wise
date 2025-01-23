import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SquarePlusIcon } from "lucide-react";
import { motion } from "framer-motion";

import { useCurrentUser, useSharedThreadsCategories } from "@/hooks";

import { Button } from "@/components/ui/button";
import ThreadList from "@/components/shared/thread-list";
import SearchThread from "@/components/shared/search-thread";
import Categories from "@/components/shared/categories";
import ThreadSkeleton from "@/components/shared/thread-skeleton";
import CategorySkeleton from "@/components/shared/category-skeleton";

export default function Threads() {
  const [searchParams] = useSearchParams();

  const { threads, categories, pending, isError } =
    useSharedThreadsCategories();

  const { data: currentUser } = useCurrentUser();

  const filteredThreads = useMemo(() => {
    if (!threads || threads.length === 0) return [];

    const search = searchParams.get("search")?.toLowerCase() || "";
    const categories =
      searchParams
        .get("categories")
        ?.toLowerCase()
        .split(",")
        .filter(Boolean) || [];

    return threads.filter((thread) => {
      // If a search term exists, check if it matches the title
      const matchesSearch = search
        ? thread.title?.toLowerCase().includes(search)
        : true;

      // If categories exist, check if the thread's category matches any
      const matchesCategory = categories.length
        ? categories.includes(thread.category?.toLowerCase())
        : true;

      // Return the thread if it matches both search and category filters
      return matchesSearch && matchesCategory;
    });
  }, [threads, searchParams]);

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
      <div className="max-w-4xl px-4 pt-20 mx-auto">
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Diskusi Aktif<span className="text-blue-500">.</span>
            </h2>
            <div className="h-[2px] w-36 bg-blue-500"></div>
          </div>
          <div>
            {currentUser && (
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
            )}
          </div>
        </div>
        <div>
          <SearchThread />
        </div>
      </div>
      <div className="max-w-4xl px-4 mx-auto py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          <div className="order-1 md:order-0 md:col-span-2">
            {pending ? (
              <ThreadSkeleton threadLength={3} />
            ) : isError ? (
              <span>Not Found Threads</span>
            ) : (
              threads && <ThreadList threads={filteredThreads} />
            )}
          </div>
          <div className="order-0 md:order-1 md:col-span-1">
            <div className="p-4 bg-white border rounded-md shadow-sm">
              <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-lg font-semibold">Kategori Popular</h2>
                <div className="bg-blue-500 w-36 h-[2px]"></div>
              </div>
              {pending ? (
                <CategorySkeleton categoryLength={3} />
              ) : isError ? (
                <span>Not Found Categories</span>
              ) : (
                categories && <Categories categories={categories} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
