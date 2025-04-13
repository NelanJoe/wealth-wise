import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const error = useRouteError();

  let content;

  if (isRouteErrorResponse(error)) {
    content = (
      <div className="flex flex-col items-center justify-center gap-3">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data || "Something went wrong."}</p>
      </div>
    );
  } else if (error instanceof Error) {
    content = (
      <div className="flex flex-col items-center justify-center gap-3">
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre className="p-2 text-sm bg-gray-100 rounded">{error.stack}</pre>
      </div>
    );
  } else {
    content = (
      <div>
        <h1 className="text-center">Unknown Error</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="grid max-w-5xl px-4 mx-auto py-80 place-content-center">
        <div className="space-y-4">
          {content}
          <div className="flex justify-center">
            <Button asChild size="sm">
              <Link to="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
