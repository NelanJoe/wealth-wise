import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import auth from "@/lib/firebase/auth";

export default function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/", { replace: true });
      }

      return;
    });

    return () => unsubcribe();
  }, [navigate]);

  return (
    <main className="grid min-h-screen bg-white place-content-center">
      <section className="px-4 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 shadow-lg shadow-gray-200 rounded-xl md:flex-row md:p-8 md:gap-4 md:w-[900px] md:h-fit border">
          <div className="md:w-1/2">
            <img
              src="/assets/pattern.jpg"
              alt="illustration-pattern"
              className="object-cover h-[60px] w-full rounded-t-lg md:h-full md:rounded-xl"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}
