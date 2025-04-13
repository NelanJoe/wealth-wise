import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";

import { useLoginWithGoogle } from "@/hooks";

import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components/auth";
import MetaHead from "@/components/common/meta-head";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { loginWithGoogle, isPending } = useLoginWithGoogle();

  return (
    <Fragment>
      <MetaHead title="Daftar" />
      <div className="mb-4">
        <Button
          asChild
          variant="outline"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center gap-3">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Kembali</span>
          </div>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-semibold">Pendaftaran Akun.</h2>
          <p className="text-sm prose">
            Selamat datang kembali! Pilih salah satu metode untuk mendaftarkan
            akun anda:
          </p>
        </div>
        <div className="flex flex-col">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => loginWithGoogle()}
            disabled={isPending}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            {!isPending && (
              <div className="flex flex-row items-center justify-center gap-1">
                <img
                  src="/assets/google.svg"
                  alt="google-icon"
                  className="w-8 h-8"
                />
                <span>Google</span>
              </div>
            )}
          </Button>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <div className="border-b border-gray-200 grow"></div>
          <h3 className="font-sm">Or</h3>
          <div className="border-b border-gray-200 grow"></div>
        </div>
        <div>
          <RegisterForm />
        </div>
        <div>
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-500 underline hover:text-blue-600"
          >
            Masuk sekarang
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
