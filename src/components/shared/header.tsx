import { Link, NavLink } from "react-router-dom";
import { AlignJustifyIcon, LogOutIcon } from "lucide-react";

import { useCurrentUser, useLogout, useMediaQuery } from "@/hooks";
import { links } from "@/libs/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <nav className="flex flex-row items-center justify-between h-20 max-w-5xl px-4 mx-auto">
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
  const { data: currentUser } = useCurrentUser();

  const { logout } = useLogout();
  const onLogout = () => logout();

  return (
    <div className="flex items-center gap-2">
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
      <div>
        {currentUser ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                />
                <AvatarFallback>
                  {currentUser.displayName?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="p-2 w-fit">
              <Button variant="destructive" size="sm" onClick={onLogout}>
                <div className="flex items-center gap-2">
                  <LogOutIcon className="w-4 h-4" /> <span>Logout</span>
                </div>
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            asChild
            className="bg-blue-500 rounded-lg hover:bg-blue-500/80"
          >
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

const MobileView = () => {
  const { data: currentUser } = useCurrentUser();

  const { logout } = useLogout();
  const onLogout = () => logout();

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
              <div>
                {currentUser ? (
                  <Button variant="destructive" size="sm" onClick={onLogout}>
                    <div className="flex items-center gap-2">
                      <LogOutIcon className="w-4 h-4" /> <span>Logout</span>
                    </div>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="bg-blue-500 rounded-lg hover:bg-blue-500/80"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
