import { Link, NavLink } from "react-router-dom";
import { AlignJustifyIcon } from "lucide-react";

import { useMediaQuery } from "@/hooks";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <nav className="flex flex-row justify-between items-center max-w-4xl mx-auto px-4 h-20">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="wealth-wise-logo"
            className="object-cover w-32"
            loading="lazy"
          />
        </Link>
        {isDesktop && <DesktopView />}
        {!isDesktop && <MobileView />}
      </nav>
    </header>
  );
}

const DesktopView = () => {
  return (
    <div className="flex gap-2 items-center">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          className={({ isActive }) =>
            isActive
              ? "font-medium text-blue-500"
              : "font-medium hover:text-blue-500 transition-all duration-150 ease-in-out"
          }
        >
          {link.name}
        </NavLink>
      ))}
      <div>user info</div>
    </div>
  );
};

const MobileView = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustifyIcon className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Wealth Wise</SheetTitle>
          <SheetDescription className="text-left">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-blue-500"
                      : "font-medium hover:text-blue-500 transition-all duration-150 ease-in-out"
                  }
                >
                  <SheetTrigger>{link.name}</SheetTrigger>
                </NavLink>
              ))}
              <div>User info</div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const links: { name: string; href: string }[] = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Kalkulator",
    href: "/kalkulator",
  },
  {
    name: "Forum",
    href: "/forum",
  },
  {
    name: "Artikel",
    href: "/artikel",
  },
  {
    name: "Tentang",
    href: "/tentang",
  },
];
