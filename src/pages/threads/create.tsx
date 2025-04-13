import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import { useCurrentUser } from "@/hooks";

import { ThreadForm } from "@/components/thread";
import { Button } from "@/components/ui/button";

export default function ThreadsCreate() {
  const navigate = useNavigate();

  const { data: currentUser } = useCurrentUser();

  if (!currentUser) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="max-w-5xl px-4 py-16 mx-auto md:py-24">
      <div>
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="rounded-full cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Kembali</span>
          </div>
        </Button>
      </div>
      <div className="my-8">
        <h1 className="text-3xl font-bold leading-normal text-center">
          Tambah Diskusi Baru
        </h1>
      </div>
      <div className="p-4 bg-white border rounded-md shadow-md">
        <ThreadForm />
      </div>
    </div>
  );
}
