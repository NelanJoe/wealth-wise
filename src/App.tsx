import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BaseLayout from "@/layouts/base.layout";
import NotFound from "@/pages/error/error.page";
import Home from "@/pages/home/home.page";
import CalculatorPage from "@/pages/calculator/calculator.page";
import ArticlePage from "@/pages/article/article.page";
import AboutPage from "@/pages/about/about.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <NotFound />,
    children: [
      {
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/kalkulator",
            element: <CalculatorPage />,
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
      defaultOptions: {},
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
