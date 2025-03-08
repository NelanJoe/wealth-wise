export const formatDate = (dateStr: string, locale: string = "id-ID") => {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
