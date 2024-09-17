export const formatTimeAgo = (date: string) => {
  const diff = (new Date().getTime() - new Date(date).getTime()) / 1000;

  if (diff >= 86400) return `${Math.floor(diff / 86400)} hari yang lalu`;
  if (diff >= 3600) return `${Math.floor(diff / 3600)} jam yang lalu`;
  if (diff >= 60) return `${Math.floor(diff / 60)} menit yang lalu`;
  if (diff > 0) return `${Math.floor(diff)} detik yang lalu`;

  return "Baru saja";
};
