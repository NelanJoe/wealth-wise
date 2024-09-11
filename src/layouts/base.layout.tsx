import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration
        getKey={(location) => {
          const paths = ["/home", "/login", "/register"];
          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }}
      />
      <Footer />
    </>
  );
}
