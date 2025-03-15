import { Cookies } from "react-cookie";
import { addDays } from "date-fns";

const COOKIE_NAME = import.meta.env.ACCESS_TOKEN_NAME || "access_token_name";

const accessTokenCookie = new Cookies(null, {
  path: "/",
  sameSite: "none",
  secure: true,
  expires: addDays(new Date(), 30), // 1 days
});

export const accessToken = {
  get() {
    return accessTokenCookie.get(COOKIE_NAME) || null;
  },
  set(token: string) {
    accessTokenCookie.set(COOKIE_NAME, token);
  },
  remove() {
    accessTokenCookie.remove(COOKIE_NAME);
  },
};
