import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration
        getKey={(location) => {
          const paths = ["/forum"];
          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }}
      />
      <Footer />
    </>
  );
}
