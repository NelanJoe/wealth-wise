import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export const formatTimeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  return formatDistanceToNow(date, { addSuffix: true, locale: id });
};
