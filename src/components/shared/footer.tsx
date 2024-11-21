import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { footerLinks } from "@/lib/consts";

export default function Footer() {
  return (
    <div className="py-20 bg-blue-500">
      <div className="max-w-4xl mx-auto px-4 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">Wealth Wise</h2>
            <p>Calculate, Connect, Thrive!</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:underline transition-all duration-100 ease-in-out"
              >
                <div className="flex items-center gap-1">
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3 h-3 transition-all duration-150 ease-in-out" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-b my-8"></div>
        <div className="text-sm">© 2022 Wealth Wise. All rights reserved.</div>
      </div>
    </div>
  );
}
