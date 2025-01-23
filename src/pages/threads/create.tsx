import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import ThreadForm from "@/components/shared/thread-form";
import { Button } from "@/components/ui/button";

export default function ThreadsCreate() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
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
