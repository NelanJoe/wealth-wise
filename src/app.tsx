import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import BaseLayout from "@/layouts/base.layout";
import AuthLayout from "@/layouts/auth.layout";

import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import CalculatorPage from "@/pages/calculators";
import ArticlePage from "@/pages/article";
import AboutPage from "@/pages/about";
import Threads from "@/pages/threads";
import ThreadShow from "@/pages/threads/show";
import ThreadsCreate from "@/pages/threads/create";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "kalkulator", element: <CalculatorPage /> },
      { path: "forum", element: <Threads /> },
      { path: "threads/create", element: <ThreadsCreate /> },
      { path: "threads/:threadId", element: <ThreadShow /> },
      { path: "artikel", element: <ArticlePage /> },
      { path: "tentang", element: <AboutPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

const Providers = () => {
  const [queryClient] = useState(() => {
    return new QueryClient({});
  });

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default function App() {
  return <Providers />;
}
