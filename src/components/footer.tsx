import { Link } from "react-router-dom";

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
            <Link to="/kalkulator">Kalkulator</Link>
            <Link to="/forum">Forum</Link>
            <Link to="/artikel">Artikel</Link>
            <Link to="/tentang">Tentang</Link>
          </div>
        </div>
        <div className="border-b my-8"></div>
        <div className="text-sm">© 2022 Wealth Wise. All rights reserved.</div>
      </div>
    </div>
  );
}
