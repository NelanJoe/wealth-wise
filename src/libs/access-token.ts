import { Cookies as ReactCookie } from "react-cookie";
import { addDays } from "date-fns";

const COOKIE_NAME = import.meta.env.ACCESS_TOKEN_NAME || "access-token-name";

const accessTokenCookie = new ReactCookie(null, {
  path: "/",
  sameSite: "none",
  secure: true,
  expires: addDays(new Date(), 1), // 1 days
});

export const acessToken = {
  get() {
    return accessTokenCookie.get(COOKIE_NAME) || null;
  },
  set(token: string) {
    return accessTokenCookie.set(COOKIE_NAME, token);
  },
  remove() {
    return new Promise<void>((resolve) => {
      accessTokenCookie.remove(COOKIE_NAME);
      resolve();
    });
  },
};
