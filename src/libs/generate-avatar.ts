export const generateAvatar = (displayName: string) => {
  const clearName = displayName
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase()
    .slice(0, 2);

  return `https://ui-avatars.com/api/?format=svg&background=0D8ABC&color=fff&uppercase=false&name=${clearName}`;
};
