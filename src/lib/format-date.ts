export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  });
};
