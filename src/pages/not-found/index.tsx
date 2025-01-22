import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-80 grid place-content-center">
          <div className="flex items-center flex-col justify-center gap-3">
            <h1>
              {error.status} {error.statusText}
            </h1>
            <p>{error.data}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  } else if (error instanceof Error) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-80 grid place-content-center">
          <div className="flex items-center flex-col justify-center gap-3">
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
          </div>
        </main>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-80 grid place-content-center">
          <div>
            <h1 className="text-center">Unknown Error</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
