import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (dateStr: string, locale: string = "id") => {
  const date = new Date(dateStr);

  return format(date, "dd/MM/yyyy", {
    locale: locale === "id" ? id : undefined,
  });
};
