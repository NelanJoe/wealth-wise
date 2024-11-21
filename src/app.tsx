import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BaseLayout from "@/layouts/base.layout";
import ErrorPage from "@/pages/error";
import HomePage from "@/pages/home";
import CalculatorPage from "@/pages/calculators";
import ArticlePage from "@/pages/article";
import AboutPage from "@/pages/about";
import Threads from "@/pages/threads";
import ThreadShow from "@/pages/threads/show";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/kalkulator",
            element: <CalculatorPage />,
          },
          {
            path: "/forum",
            children: [
              {
                index: true,
                element: <Threads />,
              },
              {
                path: ":id",
                element: <ThreadShow />,
              },
            ],
          },
          {
            path: "/artikel",
            element: <ArticlePage />,
          },
          {
            path: "/tentang",
            element: <AboutPage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // staleTime: Infinity,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
