import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import LoginForm from "@/components/shared/login-form";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
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
          <h2 className="text-2xl font-semibold">Masuk ke akun anda.</h2>
          <p className="text-sm prose">
            Selamat datang kembali! Pilih salah satu metode untuk masuk akun
            anda:
          </p>
        </div>
        <div className="flex flex-col">
          <Button variant="outline" className="w-full">
            <div className="flex flex-row items-center justify-center gap-1">
              <img
                src="/assets/google.svg"
                alt="google-icon"
                className="w-8 h-8"
              />
              <span>Google</span>
            </div>
          </Button>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="border-b-2 border-gray-200 grow"></div>
          <h3 className="font-sm">Or</h3>
          <div className="border-b-2 border-gray-200 grow"></div>
        </div>
        <div>
          <LoginForm />
        </div>
        <div>
          Belum punya akun?{" "}
          <Link to="/register" className="font-semibold text-primary-blue">
            Buat akun
          </Link>
        </div>
      </div>
    </>
  );
}
